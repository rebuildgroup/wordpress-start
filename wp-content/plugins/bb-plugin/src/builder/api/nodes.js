import { getNode, getLayoutActions } from 'data'

const getDeleteConfirmationMessage = type => {
	const { deleteRowMessage, deleteColumnMessage, deleteModuleMessage } = window.FLBuilderStrings
	switch ( type ) {
	case 'row':
		return deleteRowMessage
	case 'column':
		return deleteColumnMessage
	default:
		return deleteModuleMessage
	}
}

/**
 * Handles deleting any type of node and gets confirmation if needed
 */
export const deleteNode = id => {

	if ( ! id ) {
		return
	}

	let shouldDelete = true
	const node = getNode( id )

	// Handle confirmation if needed
	if ( FLBuilder._needsDeleteConfirmation( node ) ) {
		const message = getDeleteConfirmationMessage( node.type )
		shouldDelete = confirm( message )
	}

	if ( shouldDelete ) {
		const el = FLBuilder._getJQueryElement( id )

		if ( ! el ) {
			return
		}

		if ( 'module' === node.type ) {
			FLBuilder._deleteModule( el )

		} else if ( 'column' === node.type ) {
			const col = FLBuilder._getColToDelete( el )
			FLBuilder._deleteCol( col )

		} else if ( 'row' === node.type ) {
			FLBuilder._deleteRow( el )
		}

		FLBuilder._highlightEmptyCols()
		FLBuilder._resizeLayout()
		FLBuilder._removeAllOverlays()
	}
}

export const copyNode = id => {
	if ( ! id ) {
		return
	}
	const node = getNode( id )

	if ( ! node || 'undefined' === typeof node.type ) {
		return
	}

	if ( 'module' === node.type ) {
		FLBuilder._copyModule( id )
	} else if ( 'column' === node.type ) {
		FLBuilder._copyColumn( id )
	} else if ( 'row' === node.type ) {
		FLBuilder._copyRow( id )
	}
}

export const scrollToNode = id => {
	const el = document.querySelector( `${FLBuilder._contentClass} [data-node="${id}"]` )
	if ( el ) {
		el.scrollIntoView( {
			behavior: 'smooth',
			block: 'center',
		} )
	}
}

/**
 * Generic API for causing node reordering and reparenting.
 * This updates the layout store and triggers canvas updates.
 *
 * @param String id - node id
 * @param Int position
 * @param String | Null parent - parent node id
 * @return void
 */
export const moveNode = ( id, position, parent = null, resize = [] ) => {
	const { reorderNode, moveNode, reorderColumn, moveColumn } = getLayoutActions()
	const { type, parent: currentParent, position: currentPosition } = getNode( id )
	const isColumn = 'column' === type

	// Reorder or Reparent
	if ( parent === currentParent || null === parent ) {
		if ( position === currentPosition ) {
			return
		}
		isColumn ? reorderColumn( id, position ) : reorderNode( id, position )
	} else {

		// Reparent
		isColumn ? moveColumn( id, parent, position, resize ) : moveNode( id, parent, position )
	}
}
