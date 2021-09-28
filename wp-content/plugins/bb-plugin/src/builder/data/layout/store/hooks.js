import { useState, useRef, useEffect } from 'react'

const stripNodeSettings = nodes => {
	const updated = {}

	Object.values( nodes ).map( node => {
		const newNode = { ...node }
		delete newNode.settings
		updated[ node.node ] = newNode
	} )
	return updated
}

const getChildNodes = ( nodes = {}, parent = null ) => {
	const found = {}
	const children = Object.values( nodes ).filter( node => parent === node.parent )
	children.map( node => found[ node.node ] = node )
	return found
}

const getNodeSettings = ( state = {}, id ) => {
	const { nodes } = state.layout.present
	if ( undefined === nodes[ id ] ) {
		return {}
	}
	return nodes[ id ].settings
}

const someNodesHaveChanged = ( newState, oldState ) => {

	// have the total number of nodes changed?
	if ( Object.keys( newState ).length !== Object.keys( oldState ).length ) {
		return true
	}

	// have any properties changed - excluding settings
	return Object.values( newState ).some( node => {
		const old = oldState[ node.node ]

		if ( undefined === node || undefined === old ) {
			return true
		}

		return (
			node.type !== old.type ||
			node.parent !== old.parent ||
			node.position !== old.position ||
			node.global !== old.global
		)
	} )
}

const someSettingsHaveChanged = ( a, b ) => {
	if ( Object.keys( a ).length !== Object.keys( b ).length ) {
		return true
	}
	return Object.keys( a ).some( key => {
		return a[ key ] !== b[ key ]
	} )
}

const createStoreHooks = store => {

	/**
	 * Generic hook for observing the entire redux store.
	 * This is usually one to avoid as it exposes all of the undo/redo history.
	 */
	const useLayoutStore = ( needsRender = () => true ) => {
		const initial = store.getState()
		const prevState = useRef( initial )
		const [ state, setState ] = useState( initial )

		useEffect( () => {

			setState( store.getState() )

			return store.subscribe( () => {
				const newState = store.getState()
				if ( needsRender( prevState.current, newState ) ) {

					setState( { ...newState } )
				}
				prevState.current = newState
			} )
		}, [] )

		return state
	}

	const useNodeSettings = id => {
		const initial = getNodeSettings( store.getState(), id )
		const prevState = useRef( initial )
		const [ state, setState ] = useState( initial )

		useEffect( () => {

			// On mount, check if anything has changed since initial
			const newState = getNodeSettings( store.getState(), id )
			if ( someSettingsHaveChanged( newState, prevState.current ) ) {
				setState( newState )
			}
			prevState.current = newState

			// Subscribe to store updates
			return store.subscribe( () => {

				const latest = getNodeSettings( store.getState(), id )

				if ( someSettingsHaveChanged( latest, prevState.current ) ) {
					setState( latest )
				}
				prevState.current = latest
			} )
		}, [ id ] )

		return state
	}

	const getNodesWithoutSettings = ( state = {}, parent ) => {
		let nodes = state.layout.present.nodes
		if ( undefined !== parent ) {
			nodes = getChildNodes( nodes, parent )
		}
		return stripNodeSettings( nodes )
	}

	const useNodesWithoutSettings = parent => {

		let initial = getNodesWithoutSettings( store.getState(), parent )

		const prevState = useRef( initial )
		const [ state, setState ] = useState( initial )

		useEffect( () => {

			// On mount, check if anything has changed since initial
			const newState = getNodesWithoutSettings( store.getState(), parent )

			if ( someNodesHaveChanged( newState, prevState.current ) ) {
				setState( newState )
			}
			prevState.current = newState

			// Subscribe to store updates
			return store.subscribe( () => {

				const newState = getNodesWithoutSettings( store.getState(), parent )

				if ( someNodesHaveChanged( newState, prevState.current ) ) {
					setState( newState )
				}
				prevState.current = newState
			} )
		}, [] )

		return state
	}

	return {
		useLayoutStore, // Full store
		useNodeSettings,
		useNodesWithoutSettings
	}
}

export default createStoreHooks
