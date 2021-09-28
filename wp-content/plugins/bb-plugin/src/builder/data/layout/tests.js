import { nodeExists, verifyNodeShape, verifyNodes, getChildNodes, verifyNoOrphans } from './utils'

const tests = {

	// Test functions receive ( newState, action, prevState )
	SET_LAYOUT( state ) {
		verifyNodes( state.layout.present.nodes )
	},

	/**
	 * Generic Nodes
	 */
	INSERT_NODE( state, action ) {
		const { nodes } = state.layout.present

		// Check node exists
		console.assert( nodeExists( action.id, nodes ), 'Node should exist after insert.' )

		// Is it well formed?
		verifyNodeShape( nodes[ action.id ] )

		// does the position match the action?
		console.assert( nodes[ action.id].position === action.position, 'Node position should be consistent after insert.' )

		verifyNoOrphans( nodes )
	},
	REORDER_NODE( state, action ) {
		const { nodes } = state.layout.present

		// Check node exists
		console.assert( nodeExists( action.id, nodes ), 'Node no longer exists after reorder.' )

		// Is it well formed?
		verifyNodeShape( nodes[ action.id ] )

		// Check position
		const node = nodes[ action.id ]
		console.assert( action.position === node.position, 'Node position should match action.position' )
	},
	REPARENT_NODE( state, action ) {
		const { nodes } = state.layout.present

		console.assert( nodeExists( action.id, nodes ), 'Node should not exist after reparent' )

		// Is it well formed?
		verifyNodeShape( nodes[ action.id ] )

		console.assert( action.parent === nodes[ action.id ].parent, 'Node should have correct parent after reparent' )
	},
	DELETE_NODE( state, action ) {
		const { nodes } = state.layout.present

		// Shouldn't exist anymore
		console.assert( ! nodeExists( action.id, nodes ), 'Node should not exist after delete' )

		verifyNoOrphans( nodes )
	},

	/**
	 * Modules
	 */
	COPY_MODULE( state, action ) {
		const { nodes } = state.layout.present

		// Check node exists
		const exists = nodeExists( action.id, nodes )
		console.assert( exists, 'Node no longer exists after duplicate.' )
		if ( ! exists ) {
			return
		}

		// Is it well formed?
		verifyNodeShape( nodes[ action.id ] )
	},

	/**
	 * Columns
	 */
	DELETE_COLUMN( state ) {
		const { nodes } = state.layout.present

		verifyNoOrphans( nodes )
	},
	REPARENT_COLUMN() {
		console.warn( 'REPARENT_COLUMN needs a test.' )
	},
	RESET_COLUMN_WIDTHS( state, action ) {
		const { nodes } = state.layout.present

		action.groupIds.map( id => {
			const cols = getChildNodes( nodes, id )
			let size = 100 / cols.length
			const matches = cols.every( col => col.settings.size === size.toPrecision( 5 ) )
			console.assert( matches, 'Column sizes should match after reset' )
		} )
	},

	/**
	 * Rows
	 */
}

export default tests
