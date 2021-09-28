import { getNodeElement } from '../dom'

export const moveNode = ( id, position = 0, parent = null ) => {
	const nodeElement = getNodeElement( id )
	let parentElement = null
	let contentElement = null
	let isColumnGroup = false
	let previousParentElement = nodeElement.parentElement.closest( '[data-node]' )

	// Move within the same parent
	if ( ! parent ) {
		parentElement = nodeElement.parentElement
		contentElement = parentElement
	}

	// Move to a different parent
	if ( parent ) {
		parentElement = getNodeElement( parent )
		contentElement = parentElement.querySelector( '.fl-node-content' )
		isColumnGroup = parentElement.classList.contains( 'fl-col-group' )

		if ( isColumnGroup ) {
			contentElement = parentElement
		}
	}

	// Only move if the element isn't already in position
	if ( nodeElement !== contentElement.children[ position ] ) {
		nodeElement.remove()

		if ( position > contentElement.children.length - 1 ) {
			contentElement.appendChild( nodeElement )
		} else {
			contentElement.insertBefore( nodeElement, contentElement.children[ position ] )
		}

		// Reset col widths when reparenting to a new column group
		if ( isColumnGroup && parent ) {
			FLBuilder._resetColumnWidths( parentElement )
			FLBuilder._resetColumnWidths( previousParentElement )
		}
	}

	FLBuilder._highlightEmptyCols()
}
