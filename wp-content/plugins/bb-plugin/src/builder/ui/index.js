import React from 'react'
import c from 'classnames'
import { useSystemState, getSystemConfig } from 'data'
import { ContextMenuProvider } from './context-menu'
import { NotificationsManager } from './notifications'
import InlineEditor from './inline-editor'
import ShortcutsPanel from './shortcuts-panel'
import { SVGSymbols } from './art'
import { registerOutlinePanel } from './outline-panel'
import PanelManager from './panel-manager'
import './style.scss'

/**
 * Builder React-based UI Root
 *
 * Gets rendered onto the page and remains.
 */
const BeaverBuilderUI = () => {
	const { isEditing, shouldShowShortcuts, colorScheme } = useSystemState()
	const wrap = c( { [`fluid-color-scheme-${colorScheme}`]: colorScheme } )
	return (
		<div className={ wrap }>
			<ContextMenuProvider>
				<InlineEditor />
				{ isEditing && (
					<>
						<SVGSymbols />
						<NotificationsManager />
						{ shouldShowShortcuts && <ShortcutsPanel /> }
						<PanelManager />
					</>
				) }
			</ContextMenuProvider>
		</div>
	)
}


export const registerPanels = () => {
	const { showOutlinePanel = true } = getSystemConfig()

	if ( showOutlinePanel ) {
		registerOutlinePanel()
	}
}

export default BeaverBuilderUI
