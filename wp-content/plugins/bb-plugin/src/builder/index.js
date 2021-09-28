import React from 'react'
import { render } from 'react-dom'
import * as data from './data'
import UI, { registerPanels } from './ui'
import * as publicAPI from './api'

const { registerPanel, displayPanel, togglePanel } = publicAPI.getActions()

// Setup public API - window.FL.Builder
const api = window.FL || {}
const existing = api.Builder || {}

const Builder = {
	...existing,
	...publicAPI,
	data,
	registerPanel,
	displayPanel,
	togglePanel,
}

window.FL = {
	...api,
	Builder,
}

// Needs to happen after FL.Builder.data API is available
registerPanels()

// Render UI
const root = document.getElementById( 'fl-ui-root' )
root.classList.add( 'fluid', 'fl', 'uid' )

render( <UI />, root )
