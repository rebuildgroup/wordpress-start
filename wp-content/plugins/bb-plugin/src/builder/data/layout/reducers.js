import { combineReducers } from 'redux'
import undoable from './undoable'
import {
	mergeNode,
	insertExistingNodeAndResolvePositions,
	insertNewNodeAndResolvePositions,
	deleteNodeAndResolvePositions,
	resetColumnWidths,
} from './utils'

const nodes = ( state = {}, action ) => {
	switch ( action.type ) {
	case 'INSERT_NODE':
		return {
			...state,
			...insertNewNodeAndResolvePositions( state, action.id, {
				node: action.id,
				parent: action.parent,
				type: action.nodeType,
				position: action.position,
				settings: action.settings,
				global: action.global
			} )
		}
	case 'INSERT_FREEFORM_NODE':
		return {
			...state,
			...insertNewNodeAndResolvePositions( state, action.id, action.node )
		}
	case 'INSERT_NODES':
		return {
			...state,
			...action.nodes
		}
	case 'REORDER_NODE':
	case 'REORDER_COLUMN':
		return {
			...state,
			...insertExistingNodeAndResolvePositions( action.id, state[ action.id ].parent, action.position, state )
		}
	case 'REPARENT_NODE':
	case 'REPARENT_COLUMN':
		return {
			...state,
			...insertExistingNodeAndResolvePositions( action.id, action.parent, action.position, state )
		}
	case 'UPDATE_NODE':
		return {
			...state,
			[ action.id ]: mergeNode( state[ action.id ], action.node )
		}
	case 'UPDATE_NODE_SETTING':
		return {
			...state,
			[ action.id ]: mergeNode( state[ action.id ], {
				settings: {
					...state[ action.id ].settings,
					[ action.key ]: action.value
				}
			} )
		}
	case 'UPDATE_NODE_SETTINGS':
		if ( undefined === state[ action.id ] ) {
			return state
		}
		return {
			...state,
			[ action.id ]: mergeNode( state[ action.id ], {
				settings: {
					...state[ action.id ].settings,
					...action.settings,
					type: 'module' === state[ action.id ].type ? state[ action.id ].settings.type : undefined
				}
			} )
		}
	case 'DELETE_NODE':
		return deleteNodeAndResolvePositions( action.id, state )

	/**
	 * Modules
	 *
	 * ADD_MODULE has no reducer implementation. Causes Ajax -> INSERT_NODE.
	 * COPY_MODULE has no reducer implementation. Causes Ajax -> INSERT_NODE.
	 * For delete see DELETE_NODE
	 */

	/**
	 * Columns
	 *
	 * ADD_COLUMNS has no reducer implementation. Causes Ajax.
	 * COPY_COLUMN has no reducer implementation. Causes Ajax.
	 * REORDER_COLUMN shares implementation with REORDER_NODE - see above.
	 * REPARENT_COLUMN shares implementation with REPARENT_NODE - see above.
	 */
	case 'RESIZE_COLUMN':
		return {
			...state,
			[ action.id ]: mergeNode( state[ action.id ], {
				settings: {
					...state[ action.id ].settings,
					size: action.width
				}
			} ),
			[ action.siblingId ]: mergeNode( state[ action.siblingId ], {
				settings: {
					...state[ action.siblingId ].settings,
					size: action.siblingWidth
				}
			} )
		}
	case 'DELETE_COLUMN':
		return deleteNodeAndResolvePositions( action.id, state )

	case 'RESET_COLUMN_WIDTHS':
		return {
			...state,
			...resetColumnWidths( action.groupIds, state )
		}

	/**
	 * Column Groups
	 *
	 * ADD_COLUMN_GROUP has no implementation. Causes Ajax.
	 */

	/**
	 * Rows
	 *
	 * ADD_ROW has no implementation. Causes Ajax.
	 * COPY_ROW has no implementation. Causes Ajax.
	 */
	case 'RESIZE_ROW_CONTENT':
		return {
			...state,
			[ action.id ]: mergeNode( state[ action.id ], {
				settings: {
					...state[ action.id ].settings,
					'max_content_width': action.width
				}
			} )
		}
	case 'RESET_ROW_WIDTH':
		return {
			...state,
			[ action.id ]: mergeNode( state[ action.id ], {
				settings: {
					...state[ action.id ].settings,
					'max_content_width': ''
				}
			} )
		}

	/**
	 * Templates
	 *
	 * APPLY_TEMPLATE has no reducer implementation. Causes Ajax.
	 * SAVE_NODE_TEMPLATE has no reducer implementation. Causes Ajax.
	 * DELETE_NODE_TEMPLATE has no reducer implementation. Causes Ajax.
	 * SAVE_USER_TEMPLATE_SETTINGS has no reducer implementation. Causes Ajax.
	 * DELETE_USER_TEMPLATE has no reducer implementation. Causes Ajax.
	 */
	case 'ADD_COLUMN_TEMPLATE':
	case 'ADD_ROW_TEMPLATE':
		console.log( action.type, 'Needs node reducer implementation?' )
		return state

	/**
	 * Layout
	 *
	 * RENDER_LAYOUT has no reducer implementation. Causes Ajax.
	 * FETCH_LAYOUT has no reducer implementation. Causes Ajax.
	 */
	case 'SET_LAYOUT':
		return action.nodes

	/**
	 * Publish/Save Actions
	 *
	 * SAVE_LAYOUT, SAVE_DRAFT and DISCARD DRAFT trigger ajax effects.
	 */

	/**
	 * History State
	 *
	 * SAVE_HISTORY_STATE has no reducer implementation. Causes Ajax.
	 * CLEAR_HISTORY_STATES has no reducer implementation. Causes Ajax.
	 * RENDER_HISTORY_STATE has no reducer implementation. Causes Ajax.
	 */

	/**
	 * Default Pass-through
	 */
	default:
		return state
	}
}

/**
 * Tracks an array of document attachment urls.
 *
 * @var state Array
 * @var action Object
 * @return Array
 */
const attachments = ( state = [], action ) => {
	switch ( action.type ) {
	case 'SET_LAYOUT':
		if ( undefined !== action.attachments ) {
			return action.attachments
		}
		return state
	default:
		return state
	}
}

/**
 * Tracks the settings object for global settings
 *
 * @var state Object
 * @var action Object
 * @return Object
 */
const globalSettings = ( state = {}, action ) => {
	switch ( action.type ) {
	case 'SAVE_GLOBAL_SETTINGS':
		return action.settings
	default:
		return state
	}
}

/**
 * Layout reducer joins attachments, nodes, globalSettings into a single object reducer
 * It's wrapped in the Higher-Order Reducer undoable for undo/redo support
 */
export const layout = undoable( combineReducers( { attachments, nodes, globalSettings } ) )

/**
 * Tracks the id (or name - global, layout) of the settings form being edited currently.
 * returns null when inactive
 *
 * @var state null|string
 * @var action Object
 * @return null|string
 */
export const editing = ( state = null, action ) => {
	switch ( action.type ) {
	case 'DISPLAY_SETTINGS':
		return action.id
	case 'UPDATE_NODE_SETTINGS':
	case 'CANCEL_DISPLAY_SETTINGS':
		return null
	default:
		return state
	}
}

/**
 * Manages an array of any node ids (col or row) that are currently undergoing resize. \
 * Returns false when not active.
 *
 * @var state BOOL|Array
 * @var action Object
 * @return BOOL|Array
 */
export const resizing = ( state = false, action ) => {
	switch ( action.type ) {
	case 'RESIZING_COMPLETE':
		return false
	case 'RESIZE_ROW_CONTENT':
		return [ action.id ]
	case 'RESIZE_COLUMN':
		return [ action.id, action.siblingId ]
	default:
		return state
	}
}
