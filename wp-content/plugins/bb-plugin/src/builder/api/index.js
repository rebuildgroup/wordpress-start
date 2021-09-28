import { getSystemActions } from 'data'
import * as nodeAPI from './nodes'
import * as settingsAPI from './settings'

export const getActions = () => {
	const { registerPanel, displayPanel, togglePanel } = getSystemActions()

	/**
	 * Being very selective about what we expose via the public API here.
	 */
	const systemAPI = {
		registerPanel,
		displayPanel,
		togglePanel,
	}

	return {
		...systemAPI,
		...nodeAPI,
		...settingsAPI,
	}
}

export const getConfig = () => window.FLBuilderConfig

export const getStrings = () => window.FLBuilderStrings
