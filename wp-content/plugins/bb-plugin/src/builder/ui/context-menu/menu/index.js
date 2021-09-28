import React from 'react'
import { Button } from '@beaverbuilder/fluid'
import './style.scss'

const ContextMenu = ( { x, y, items = {}, clear = () => {} } ) => {

	const menuWidth = 180
	const edgeBuffer = 10
	const maxX = window.innerWidth - ( menuWidth + edgeBuffer )

	// Reduce to just the items that are enabled
	let enabledItems = {}
	Object.entries( items ).map( ( [ key, item ] ) => {
		if ( false === item.isEnabled ) {
			return
		}
		enabledItems[ key ] = item
	} )

	return (
		<div
			className="fl-builder-context-menu"
			style={ {
				top: y, /* Subtract the top bar */
				left: x < maxX ? x : maxX,
				width: menuWidth,
			} }
		>
			<ul>
				{ Object.keys( enabledItems ).map( key => {
					const { onClick, label, ...rest } = items[ key ]
					return (
						<li key={ key }>
							<Button
								onClick={ e => {
									onClick( e )
									clear()
									e.stopPropagation()
								} }
								size='sm'
								{ ...rest }
							>
								{label}
							</Button>
						</li>
					)
				} ) }
			</ul>
		</div>
	)
}

export default ContextMenu
