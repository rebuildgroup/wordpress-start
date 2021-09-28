import { applyMiddleware, compose } from 'redux'

const INCLUDE_TESTS = true

const applyTests = ( tests = {} ) => ( { getState } ) => next => action => {
	const result = next( action )
	const state = getState()

	if ( undefined !== tests[ action.type ] ) {
		tests[ action.type ]( state, action )
	}
	return result
}

/**
 * Applys before and after effects to store actions.
 */
const applyEffects = effects => {
	const { before, after } = effects
	return store => {
		return next => action => {

			if ( before && before[ action.type ] ) {
				before[ action.type ]( action, store )
			}

			const result = next( action )

			if ( after && after[ action.type ] ) {
				after[ action.type ]( action, store )
			}

			return result
		}
	}
}

/**
 * Creates all enhancers for a new store with support
 * for redux dev tools.
 */
const createEnhancers = ( name, effects = {}, tests = {} ) => {

	// Add Dev Tools Extension Support
	const devToolsCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
	const composeEnhancers = devToolsCompose ? devToolsCompose( { name } ) : compose

	if ( INCLUDE_TESTS ) {
		return composeEnhancers(
			applyMiddleware( applyTests( tests ), applyEffects( effects ) )
		)
	}
	return composeEnhancers( applyMiddleware( applyEffects( effects ) ) )
}

export default createEnhancers
