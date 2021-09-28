import * as publicAPI from './api'

// Setup public API - window.FL.Builder.__canvas
const api = window.FL || {}
const existing = api.Builder || {}

const Builder = {
	...existing,

	/**
	 * Canvas API is what will ultimately be the FL.Builder public API __INSIDE__ the iframe canvas.
	 */
	__canvas: {
		...publicAPI,
	}
}

window.FL = {
	...api,
	Builder,
}
