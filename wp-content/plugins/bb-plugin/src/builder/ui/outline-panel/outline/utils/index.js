import { sanitize } from 'dompurify'
import { getConfig } from 'api'
import useSingleAndDoubleClick from './use-single-and-double-click'

export { useSingleAndDoubleClick }

export const sanitizeString = ( string = '' ) => {
	return sanitize( string, { ALLOWED_TAGS: [] } ).substring( 0, 48 )
}

const getModuleDefinition = type => {
	const { contentItems } = getConfig()
	const def = contentItems.module.find( item => item.slug === type )
	return 'object' === typeof def ? def : false
}

export const getModuleTypeLabel = type => {
	const def = getModuleDefinition( type )
	return def ? def.name : type
}

export const hasVisibility = settings => {
	const { responsive_display = '', visibility_display = '' } = settings
	return '' !== responsive_display || '' !== visibility_display
}

export const getChildNodes = ( id, nodes ) => {
	return Object.values( nodes ).filter( node => id === node.parent )
}

export const getNodeTree = nodes => {
	const flat = Object.values( nodes )
	const tree = []

	flat.forEach( node => {
		if ( null === node.parent ) {
			return tree.push( node )
		}

		const parentIndex = flat.findIndex( item => item.node === node.parent )
		if ( ! flat[ parentIndex ].children ) {
			return flat[ parentIndex ].children = [ node ]
		}
		flat[ parentIndex ].children.push( node )
	} )
	return tree
}

/**
 * Check if the mouse is hovering in the before (top half) or after (bottom half) area of an element.
 */
export const isHoveringBefore = ( mouseY, y, height ) => {
	const half = height / 2
	const threshold = y + half
	return mouseY <= threshold
}

const draggableTypes = [ 'module', 'row', 'column' ]

export const isDraggable = type => {
	const { simpleUi } = getConfig()
	return ! simpleUi && draggableTypes.includes( type )
}

export const shouldAllowDrop = ( itemTypes = [], zoneType = '' ) => {
	if ( ! draggableTypes.includes( zoneType ) ) {
		return false
	}
	if ( zoneType === itemTypes || itemTypes.includes( zoneType ) ) {
		return true
	}
	return false
}

export const getTransparentImg = () => {
	const img = new Image()
	img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
	img.style.opacity = 0
	return img
}

/**
 * Cache the module type slugs
 */
let moduleTypeKeys = []

const getModuleTypeKeys = () => {
	if ( 0 >= moduleTypeKeys.length ) {
		const { contentItems } = getConfig() // FLBuilderConfig
		moduleTypeKeys = contentItems.module.map( type => type.slug )
	}
	return moduleTypeKeys
}

export const moduleHasDefinition = key => {
	const keys = getModuleTypeKeys()
	return keys.includes( key )
}
