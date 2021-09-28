import { getConfig } from '../api'

/**
 * Get the root layout element.
 *
 * @param string postId
 * @return HTMLElement | null
 */
export const getLayoutRoot = postId => {

	if ( ! postId ) {
		return null
	}
	return document.querySelector( `.fl-builder-content-${postId}` )
}

/**
 * Get a reference to a node's dom element from an id
 *
 * @param string id
 * @return HTMLElement | null
 */
export const getNodeElement = id => {
	const { postId } = getConfig()
	const root = getLayoutRoot( postId )

	if ( ! root ) {
		return null
	}
	return root.querySelector( `[data-node="${id}"]` )
}

/**
 * Scroll the root element of a particular node onto screen if it is not.
 *
 * @param string id
 * @return void
 */
export const scrollToNode = id => {
	const el = getNodeElement( id )
	if ( el ) {
		el.scrollIntoView( {
			behavior: 'smooth',
			block: 'center',
		} )
	}
}


