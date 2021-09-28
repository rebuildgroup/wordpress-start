import React, { useState, useEffect } from 'react'
import { ContextMenuContext, useContextMenu } from './context'
import ContextMenu from './menu'

const ContextMenuProvider = ( { children } ) => {
	const [ contextMenu, setContextMenu ] = useState( false )
	const clearContextMenu = () => setContextMenu( false )

	const context = {
		setContextMenu,
		clearContextMenu,
		showContextMenu: false !== contextMenu,
		contextMenu,
	}

	return (
		<ContextMenuContext.Provider value={ context }>
			<DismissListener />
			{ children }
			{ false !== contextMenu && <ContextMenu { ...contextMenu } clear={ clearContextMenu } /> }
		</ContextMenuContext.Provider>
	)
}

const DismissListener = () => {
	const { clearContextMenu } = useContextMenu()

	const maybeDismissOnClick = e => {

		// This is a menu and you are not clicking within it.
		if ( document.querySelector( '.fl-builder-context-menu' ) && ! e.target.closest( '.fl-builder-context-menu' ) ) {
			clearContextMenu()
			e.stopPropagation()
		}
	}
	const dismissMenuOnScroll = () => {
		if ( document.querySelector( '.fl-builder-context-menu' ) ) {
			clearContextMenu()
		}
	}

	useEffect( () => {
		window.addEventListener( 'click', maybeDismissOnClick, { capture: true } )
		window.addEventListener( 'scroll', dismissMenuOnScroll, { capture: true } )

		// Return a remover fn
		return () => {
			window.removeEventListener( 'click', maybeDismissOnClick, { capture: true } )
			window.removeEventListener( 'scroll', dismissMenuOnScroll, { capture: true } )
		}
	}, [] )

	return null
}

export {
	ContextMenuProvider,
	useContextMenu
}
