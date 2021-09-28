import { createStore, combineReducers, bindActionCreators } from 'redux'
import createEnhancers from './middleware'
import createStoreHooks from './hooks'

const defaultState = {
	layout: {
		past: [],
		present: {
			attachments: [],
			nodes: {}
		},
		future: [],
	}
}

const defaultConfig = {
	state: {},
	reducers: {},
	actions: {},
	effects: {},
	tests: {},
}

const createLayoutStore = ( initialConfig = defaultConfig, name = 'fl-builder/layout' ) => {

	const config = { ...defaultConfig, ...initialConfig }
	const state = { ...defaultState, ...config.state }
	const reducer = combineReducers( config.reducers )
	const middleware = createEnhancers( name, config.effects, config.tests )
	const store = createStore( reducer, state, middleware )

	return {
		store,
		actions: bindActionCreators( { ...config.actions }, store.dispatch ),
		hooks: createStoreHooks( store )
	}
}

export default createLayoutStore
