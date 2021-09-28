import * as nodeAPI from './nodes'

export const getConfig = () => window.FLBuilderCanvasConfig

export const getActions = () => {
	return {
		...nodeAPI,
	}
}
