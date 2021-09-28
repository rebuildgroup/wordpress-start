
export const defaultNode = {
	node: '',
	type: '',
	parent: '',
	position: 0,
	global: false,
	settings: {}
}

/**
 * Sort an array of nodes by position. Used in Array.sort()
 */
export const sortNodes = ( a, b ) => {
	if ( a.position > b.position ) {
		return 1
	} else if ( a.position < b.position ) {
		return -1
	}
	return 0
}

export const nodeExists = ( id, nodes = {} ) => undefined !== nodes[ id ]

/**
 * Get all immediate children of a particular parent node
 */
export const getChildNodes = ( nodes = {}, parent = null ) => {
	return  Object.values( nodes ).filter( node => parent === node.parent ).sort( sortNodes )
}

/**
 * Get all siblings of a particular node
 */
export const getSiblingNodes = ( nodes = {}, id ) => {
	const target = nodes[ id ]
	return Object.values( nodes ).filter( node => target.parent === node.parent && id !== node.node ).sort( sortNodes )
}

/**
 * Format Node
 */
export const mergeNode = ( prevNode = {}, node = {} ) => {
	const newNode = {
		...defaultNode,
		...prevNode,
		...node
	}
	if ( 'module' === newNode.type && undefined === newNode.settings.type ) {
		newNode.settings.type = prevNode.settings.type
	}
	return newNode
}

/**
 * Set the position of a given node, and increment the position of any trailing siblings.
 *
 * @return Object - all nodes of the same parent, including the target node.
 */
export const insertExistingNodeAndResolvePositions = ( id, parent, position, nodes = {} ) => {
	let updated = {}

	if ( undefined === nodes[ id ] ) {
		console.error( 'Undefined node', id )
		return updated
	}

	// Grab all nodes of the same parent and reset positions
	const siblings = getChildNodes( nodes, parent ).filter( sibling => id !== sibling.node )
	const ids = siblings.map( sibling => sibling.node )

	// Insert target id into array
	ids.splice( position, 0, id )

	// Reset positions for all
	ids.map( ( nodeId, i ) => {
		updated[ nodeId ] = mergeNode( nodes[ nodeId ], {
			position: i,
			parent
		} )
	} )

	// Returns all affected nodes
	return updated
}

export const insertNewNodeAndResolvePositions = ( nodes = {}, id, newNode = {} ) => {
	const newState = {
		...nodes,
		[ id ]: mergeNode( nodes[ id ], newNode )
	}

	// Returns all affected nodes
	return insertExistingNodeAndResolvePositions( newNode.node, newNode.parent, newNode.position, newState )
}

export const deleteChildren = ( id, nodes ) => {
	const toDelete = []
	const newNodes = { ...nodes }

	Object.values( newNodes ).map( node => {
		if ( id === node.parent ) {
			toDelete.push( node.node )
		}
	} )

	toDelete.map( key => {
		delete newNodes[ key ]
	} )
	return newNodes
}

export const deleteNodeAndResolvePositions = ( id, nodes ) => {
	let updated = {}

	if ( undefined === nodes[ id ] ) {
		console.warn( 'Node to be deleted is undefined', id )
		return nodes
	}

	const parent = nodes[ id ].parent
	const type = nodes[ id ].type

	// Delete the target node
	const newState = { ...nodes }
	delete newState[ id ]

	// Column nodes check for empty column-groups to delete too
	if ( 'column' === type && isNodeEmpty( parent, newState ) ) {
		delete newState[ parent ]
	}

	// Delete all child nodes
	deleteChildren( id, newState )

	// Reset sibling positions
	// Handle col size reset
	const siblings = getChildNodes( newState, parent )
	siblings.map( ( node, i ) => {
		node.position = i

		if ( 'column' === node.type ) {
			let size = 100 / siblings.length
			size = size.toPrecision( 5 ) // 3 decimal places
			node.settings.size = size
		}

		updated[ node.node ] = node
	} )

	return {
		...newState
	}
}

export const resetColumnWidths = ( groupIds = [], state ) => {
	const updated = {}
	groupIds.map( id => {
		const cols = Object.values( state ).filter( node => id === node.parent )
		let size = ( 100 / cols.length ).toPrecision( 5 ) // 3 decimal places
		cols.map( node => {
			updated[ node.node ] = mergeNode( node, {
				settings: {
					...node.settings,
					size
				}
			} )
		} )
	} )

	// Returns all affected nodes
	return updated
}

export const isNodeEmpty = ( id, state ) => {
	const children = Object.values( state ).filter( node => node.parent === id )
	return 0 === children.length
}

export const getOrphans = nodes => {
	const keys = Object.keys( nodes )
	return Object.values( nodes ).filter( node => null !== node.parent && ! keys.includes( node.node ) )
}

/**
 * Testing Utils
 */
export const verifyNodeShape = node => {

	if ( undefined === node ) {
		return
	}

	// Ensure properties
	console.assert( 'node' in node, 'Node has no id property' )
	console.assert( 'type' in node, 'Node has no type property' )
	console.assert( 'parent' in node, 'Node has no parent property' )
	console.assert( 'position' in node, 'Node has no position property' )
	console.assert( 'settings' in node, 'Node has no settings property' )
	console.assert( 'global' in node, 'Node has no global property' )

	if ( 'module' === node.type ) {
		console.assert( 'type' in node.settings, 'Module settings should contain type property.' )
	}

	if ( 'row' !== node.type ) {
		console.assert( null !== node.parent, 'Only rows should have a null parent property' )
	}
}

export const verifyNodes = nodes => {
	Object.values( nodes ).map( verifyNodeShape )
}

export const verifyNoOrphans = nodes => {
	const orphans = getOrphans( nodes )
	console.assert( 0 === orphans.length, 'There should be no orphaned nodes', orphans )
}
