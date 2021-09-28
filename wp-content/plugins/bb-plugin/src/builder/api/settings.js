import { getLayoutActions, getSystemActions } from 'data'

const isSettingsPinnedRight = () => {
	return document.body.classList.contains( 'fl-builder-ui-is-pinned-right' )
}

export const openSettings = id => {
	const { displaySettings } = getLayoutActions()
	const { hideCurrentPanel } = getSystemActions()

	displaySettings( id )

	// Hide outline panel if needed
	if ( isSettingsPinnedRight() ) {
		hideCurrentPanel()
	}
}
