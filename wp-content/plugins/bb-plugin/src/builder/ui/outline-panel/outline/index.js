import React, { useState, memo } from 'react'
import c from 'classnames'
import { __ } from '@wordpress/i18n'
import { useContextMenu } from 'ui/context-menu'
import { getActions, getConfig } from 'api'
import { getLayoutHooks, useLayoutState, getNode } from 'data'
import { sortNodes } from 'data/layout/utils'
import OutlineContext from './context'
import { Column, Row, getModuleIconComponent, Visibility } from './tiny-icons'
import {
	sanitizeString,
	getModuleTypeLabel,
	useSingleAndDoubleClick,
	shouldAllowDrop,
	isHoveringBefore,
	isDraggable,
	getTransparentImg,
	hasVisibility,
	moduleHasDefinition
} from './utils'

import './style.scss'

/**
 * Root Outline Component
 */
const Outline = () => {

	/**
	 * Get the top-level nodes to map over
	 */
	const { useNodesWithoutSettings } = getLayoutHooks()
	const topLevelNodes = useNodesWithoutSettings( null )
	const nodes = Object.values( topLevelNodes ).sort( sortNodes )

	/**
	 * Keep track of any node being dragged currently.
	 */
	const [ draggingItem, setDraggingItem ] = useState( false )
	const isDraggingItem = false !== draggingItem

	/**
	 * Expose dragging item via OutlineContext
	 */
	const context = {
		draggingItem,
		isDraggingItem,
		clearDraggingItem: () => setDraggingItem( false ),
		setDraggingItem: item => setDraggingItem( item ),
	}

	const classes = c( 'fl-builder-node-outline', {
		'is-dragging': isDraggingItem,
		[`is-dragging-type-${ draggingItem.type }`]: draggingItem
	} )

	return (
		<OutlineContext.Provider value={ context }>
			<ul className={ classes }>
				{ nodes.map( ( node, i ) => (
					<Item
						key={ node.node }
						level={ 1 }
						index={ i }
						{ ...node }
					/>
				) ) }
			</ul>
		</OutlineContext.Provider>
	)
}

/**
 * Generic Outline Item
 * Represents any kind of node.
 */
const Item = ( {
	node: id,
	index,
	level,
	type,
	global = false,
	parent
} ) => {
	const { moveNode } = getActions()
	const { useNodesWithoutSettings } = getLayoutHooks()
	const children = useNodesWithoutSettings( id )
	const hasChildren = 0 < Object.keys( children ).length

	/**
	 * Drag info
	 */
	const { draggingItem, setDraggingItem, clearDraggingItem } = OutlineContext.use()
	const [ isDraggingOver, setIsDraggingOver ] = useState( false )

	const [ showContent, setShowContent ] = useState( true )

	const classes = c( 'fl-builder-node-outline-item', {
		[`fl-builder-node-type-${ type }`]: type,
		'show-drop-before': 'before' === isDraggingOver,
		'show-drop-after': 'after' === isDraggingOver,
		'is-dragging-self': id === draggingItem?.id
	} )

	return (
		<li
			className={ classes }
			style={ { '--level': level } }
			draggable={ isDraggable( type ) }

			onDragStart={ e => {

				// Required for draggable DOM elements
				e.stopPropagation()

				// Setup drag data
				e.dataTransfer.setDragImage( getTransparentImg(), 0, 0 )
				e.dataTransfer.setData( type, id )
				e.dataTransfer.setData( 'node-id', id )
				e.dataTransfer.setData( 'node-type', type )

				// Set the item data on the root OutlineContext
				setDraggingItem( { id, type } )
			} }
			onDragEnd={ () => clearDraggingItem() }

			onDragOver={ e => {
				e.preventDefault()
				e.stopPropagation()
				e.dataTransfer.dropEffect = 'move'

				// Double check we have the right element
				if ( ! e.currentTarget.classList.contains( 'fl-builder-node-outline-item' ) ) {
					console.warn( 'Problem: Something other than fl-builder-node-outline-item-content' )
					return
				}

				// Abort if we're not dragging a type that can be dropped here.
				if ( ! shouldAllowDrop( e.dataTransfer.types, type ) ) {
					return
				}

				/**
				 * Determine if we need a drop zone before or after the element.
				 */
				const { y, height } = e.currentTarget.getBoundingClientRect()
				if ( isHoveringBefore( e.clientY, y, height ) && 'before' !== isDraggingOver ) {
					setIsDraggingOver( 'before' )
				} else if ( ! isHoveringBefore( e.clientY, y, height ) && 'after' !== isDraggingOver ) {
					setIsDraggingOver( 'after' )
				}
			} }
			onDragLeave={ () => {
				isDraggingOver && setIsDraggingOver( false )
			} }

			onDrop={ e => {
				isDraggingOver && setIsDraggingOver( false )
				clearDraggingItem()

				if ( shouldAllowDrop( e.dataTransfer.types, type ) ) {

					// Determine which zone
					const { y, height } = e.currentTarget.getBoundingClientRect()
					const zone = isHoveringBefore( e.clientY, y, height ) ? 'before' : 'after'

					// Node to be moved
					const nodeID = e.dataTransfer.getData( 'node-id' )
					const { position: currentPos, parent: currentParent } = getNode( nodeID )
					let pos = index

					if ( parent === currentParent ) {

						// Reorder nodes within the same parent.
						if ( 'before' === zone ) {
							if ( currentPos === ( index - 1 ) ) {
								return
							} else {
								pos = currentPos > index ? index : Math.max( 0, index - 1 )
							}
						} else if ( 'after' === zone ) {
							if ( currentPos === ( index + 1 ) ) {
								return
							} else {
								pos = currentPos > index ? index + 1 : index
							}
						}
					} else {

						// Move nodes to a new parent.
						pos = 'after' === zone ? index + 1 : index
					}

					// Drop zone node - position comes from prop
					moveNode( nodeID, pos, parent, [ parent, currentParent ] )
				}
			} }
		>
			{ /* Item Label */ }
			{ 'column-group' !== type && (
				<ItemContent
					id={ id }
					type={ type }
					global={ global }
					position={ index }
					level={ level }
					toggleContent={ () => setShowContent( ! showContent ) }
					isShowingContent={ showContent }
				/>
			) }

			{ /* Empty Column Drop Zone */ }
			{ 'module' !== type && ! hasChildren && ! global && (
				<EmptyDropArea
					id={ id }
					type={ type }
				/>
			) }

			{ /* Child Nodes if any */ }
			{ 0 < Object.keys( children ).length && showContent && (
				<ul>
					{ Object.values( children ).sort( sortNodes ).map( ( node, i ) => (
						<Item
							key={ node.node }
							level={ 'column-group' === type ? level : level + 1 }
							index={ i }
							{ ...node }
						/>
					) ) }
				</ul>
			) }
		</li>
	)
}

const EmptyDropArea = ( { id, type, ...rest } ) => {
	const [ isOver, setIsOver ] = useState( false )
	const { moveNode } = getActions()
	const { clearDraggingItem } = OutlineContext.use()

	const classes = c( 'fl-builder-node-empty-drop-area', {
		'is-over': isOver
	} )
	return (
		<div
			className={ classes }
			onDragOver={ e => {

				if ( 'column' !== type ) {
					return
				}

				if ( shouldAllowDrop( e.dataTransfer.types, 'module' ) ) {
					setIsOver( true )
				}
			} }
			onDragLeave={ () => isOver && setIsOver( false ) }
			onDrop={ e => {
				setIsOver( false )
				clearDraggingItem()

				if ( 'column' !== type ) {
					return
				}

				if ( shouldAllowDrop( e.dataTransfer.types, 'module' ) ) {

					// Node to be moved
					const nodeID = e.dataTransfer.getData( 'node-id' )

					// Set the node to the first position in this parent.
					moveNode( nodeID, 0, id )
				}
			} }
			{ ...rest }
		>
			<div className="drop-area" />
		</div>
	)
}

const ItemContent = memo( ( { id, type, global, level, toggleContent, isShowingContent = true } ) => {
	const { useNodeSettings } = getLayoutHooks()
	const settings = useNodeSettings( id )
	const { setContextMenu, contextMenu, clearContextMenu } = useContextMenu()
	const { openSettings, deleteNode, copyNode, scrollToNode } = getActions()
	const { simpleUi } = getConfig()
	const hasVisibilitySettings = hasVisibility( settings )
	const showDisclosureTriangle = 'row' === type && ! global

	// Check if modules have a registered definition
	let hasDefinition = true
	if ( 'module' === type ) {
		hasDefinition = moduleHasDefinition( settings.type )
	}

	const classes = c( 'fl-builder-node-outline-item-content', {
		'has-context-menu': false !== contextMenu && id === contextMenu.id,
		'is-global-node': global,
		'is-missing-definition': ! hasDefinition,
	} )

	// Allows delaying clicks long enough to check if its a doubleclick
	const [ onClick, onDoubleClick ] = useSingleAndDoubleClick( {
		onClick: () => {

			if ( ! hasDefinition ) {
				return
			}
			scrollToNode( id )
		},
		onDoubleClick: () => {

			if ( ! hasDefinition ) {
				return
			}
			scrollToNode( id )
			openSettings( id )
		}
	} )

	return (
		<div
			className={ classes }
			onClick={ onClick }
			onDoubleClick={ onDoubleClick }
			onPointerEnter={ () => {
				const el = document.querySelector( `.fl-node-${id}` )
				if ( el ) {
					el.style.boxShadow = `inset 0 0 0 2px var(--fl-builder-${ global ? 'orange' : 'blue' } ), 0 0 0 1px hsla( 210, 0%, 0%, .5 )`
				}
			} }
			onPointerLeave={ () => {
				const el = document.querySelector( `.fl-node-${id}` )
				if ( el ) {
					el.style.boxShadow = ''
				}
			} }
			onContextMenu={ e => {

				// Already showing custom context menu, so show default browser menu.
				if ( false !== contextMenu && id === contextMenu.id ) {
					clearContextMenu()
					return
				}

				const items = {
					settings: {
						label: 'Open Settings',
						isEnabled: hasDefinition,
						onClick: () => {
							scrollToNode( id )
							openSettings( id )
						}
					},
					clone: {
						label: 'Duplicate',
						isEnabled: hasDefinition && ! simpleUi,
						onClick: () => copyNode( id )
					},
					delete: {
						label: FLBuilderStrings.remove,
						isEnabled: ! simpleUi,
						status: 'destructive',
						onClick: () => deleteNode( id )
					}
				}

				setContextMenu( {
					id,
					items,
					type,
					global,
					x: e.clientX,
					y: e.clientY
				} )

				// Otherwise, show custom context menu
				e.preventDefault()
			} }
		>
			{ showDisclosureTriangle && (
				<span className="fl-builder-outline-item-gutter">
					<button
						className={ ! isShowingContent && 'is-hiding-content' }
						onClick={ e => {
							toggleContent( e )
							e.preventDefault()
							e.stopPropagation()
						} }>
						<DisclosureArrow />
					</button>
				</span>
			) }

			<span className="fl-builder-outline-item-icon-wrap">
				<Icon
					type={ type }
					moduleType={ settings.type }
					settings={ settings }
					hasDefinition={ hasDefinition }
				/>
			</span>

			<span className="fl-builder-outline-item-label-wrap">
				<ItemLabel
					type={ type }
					settings={ settings }
					level={ level }
				/>
			</span>
			<Size
				id={ id }
				type={ type }
				size={ parseFloat( settings.size ) }
				width={ settings['max_content_width'] }
				widthUnit={ settings['max_content_width_unit'] }
			/>
			{ hasVisibilitySettings && (
				<span className="fl-builder-outline-item-icon-wrap">
					<Visibility />
				</span>
			) }
		</div>
	)
} )

const ItemLabel = ( { type, settings = {}, level } ) => {
	let typeLabel = undefined !== settings.type ? getModuleTypeLabel( settings.type ) : type
	let description = ''

	if ( 'column' === type && 3 <= level ) {
		typeLabel = FLBuilderStrings.childColumn
	}

	if ( 'row' === typeLabel ) {
		typeLabel = FLBuilderStrings.row
	}

	if ( 'column' === typeLabel ) {
		typeLabel = FLBuilderStrings.column
	}

	if ( 'module' === type && 'type' in settings ) {
		switch ( settings.type ) {
		case 'heading':
			typeLabel = settings.tag
			description = settings.heading
			break
		case 'html':
			description = settings.html
			break
		case 'rich-text':
		case 'icon':
		case 'button':
			description = settings.text
			break
		case 'callout':
			description = settings.title
			break
		}
	}

	if ( 'node_label' in settings && '' !== settings.node_label ) {
		const nodeLabel = settings.node_label

		if ( ! description || '' === description ) {
			description = nodeLabel
		} else {
			description = nodeLabel + ' - ' + description
		}
	}

	return (
		<>
			{ typeLabel }
			{ description && <span style={ { opacity: .6 } }>{ ': ' + sanitizeString( description ) }</span> }
		</>
	)
}

// Generic badge container
const PillBox = ( { children, style, ...rest } ) => {
	return (
		<span
			style={ {
				textTransform: 'lowercase',
				background: 'rgba(0,0,0,.05)',
				color: '#828282',
				fontSize: 11,
				flex: '0 0 auto',
				display: 'inline-flex',
				padding: '2px 6px',
				borderRadius: 25,
				whiteSpace: 'nowrap',
				overflow: 'hidden',
				textOverflow: 'ellipsis',
				fontFamily: 'monospace',
				...style
			} }
			title={ children }
			{ ...rest }
		>
			{children}
		</span>
	)
}

const Icon = memo( ( { type, moduleType, settings, hasDefinition } ) => {
	switch ( type ) {
	case 'row':
		return <Row />
	case 'column':
		return <Column />
	case 'module':
		const Component = getModuleIconComponent( moduleType, settings, hasDefinition )
		return <Component />
	}
} )

const Size = ( { id, type, size, width, widthUnit } ) => {
	const { resizing } = useLayoutState()
	let string = ''

	if ( resizing && resizing.includes( id ) ) {
		if ( 'column' === type ) {
			string += ` ${size}% `
		} else if ( 'row' === type ) {
			string += `Max: ${width + widthUnit}`
		}
	}

	if ( '' === string ) {
		return null
	}

	return (
		<PillBox style={ {
			background: 'var(--fl-builder-blue)',
			color: 'white'
		} }>
			{ string }
		</PillBox>
	)
}

const DisclosureArrow = () => (
	<svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path fillRule="evenodd" clipRule="evenodd" d="M2.79289 1.29289C3.18342 0.902369 3.81658 0.902369 4.20711 1.29289L7.20711 4.29289C7.59763 4.68342 7.59763 5.31658 7.20711 5.70711L4.20711 8.70711C3.81658 9.09763 3.18342 9.09763 2.79289 8.70711C2.40237 8.31658 2.40237 7.68342 2.79289 7.29289L5.08579 5L2.79289 2.70711C2.40237 2.31658 2.40237 1.68342 2.79289 1.29289Z" fill="currentColor"/>
	</svg>
)

export default Outline
