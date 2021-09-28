import { createContext, useContext } from 'react'

const defaults = {}

export const ContextMenuContext = createContext( defaults )

export const useContextMenu = () => useContext( ContextMenuContext )
