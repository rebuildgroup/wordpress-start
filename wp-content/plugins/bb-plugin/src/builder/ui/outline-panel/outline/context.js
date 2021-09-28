import { createContext, useContext } from 'react'

const OutlineContext = createContext( {} )

OutlineContext.use = () => useContext( OutlineContext )

export default OutlineContext
