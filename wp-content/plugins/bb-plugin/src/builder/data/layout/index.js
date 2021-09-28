import createLayoutStore from './store'
import * as reducers from './reducers'
import * as effects from './effects'
import * as actions from './actions'
import tests from './tests'

const { global } = FLBuilderConfig

const state = {
	layout: {
		present: {
			nodes: {},
			globalSettings: global
		}
	}
}

const {
	store,
	actions: actionCreators,
	hooks
} = createLayoutStore( { state, reducers, effects, actions, tests } )

export const getLayoutStore = () => store

export const getLayoutState = () => store.getState()

export const getLayoutActions = () => actionCreators

export const getLayoutHooks = () => hooks

export const useLayoutState = hooks.useLayoutStore

export const getNode = id => {
	const { nodes } = getLayoutState().layout.present
	if ( id && id in nodes ) {
		return nodes[ id ]
	}
	return nodes
}

export const getChildren = id => {
	const { nodes } = getLayoutState().layout.present
	return Object.values( nodes ).filter( node => id === node.parent )
}

// Initialize the data
store.dispatch( actions.fetchLayout() )
