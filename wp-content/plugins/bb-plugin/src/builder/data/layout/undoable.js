/**
 * Higher-order reducer to add undo/redo functionality.
 */
const undoable = reducer => {

	// Call the reducer with empty action to populate the initial state
	const defaultState = {
		past: [],
		present: reducer( undefined, {} ),
		future: [],
	}

	// Return a reducer that handles undo and redo
	return function( state = defaultState, action ) {
		const { past = [], present, future = [] } = state

		switch ( action.type ) {

		/*
		case 'UNDO':
			const previous = past[ past.length - 1 ] // eslint-disable-line
			const newPast = past.slice( 0, past.length - 1 ) // eslint-disable-line
			return {
				past: newPast,
				present: previous,
				future: [ present, ...future ]
			}
		case 'REDO':
			const next = future[0] // eslint-disable-line
			const newFuture = future.slice( 1 ) // eslint-disable-line
			return {
				past: [ ...past, present ],
				present: next,
				future: newFuture
			}
		*/

		/**
		 * Any high precision actions should be excluded from creating undo states.
		 */
		case 'RESIZE_COLUMN':
			if ( ! action.persist ) {
				return {
					past,
					present: reducer( present, action ),
					future
				}
			}
			return {
				past,
				present: reducer( present, action ),
				future
			}
		default:
			return {
				past,
				present: reducer( present, action ),
				future
			}
		}
	}
}

export default undoable
