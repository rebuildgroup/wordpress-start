import { useRef, useEffect } from 'react'

const noop = () => {}

const requestTimeout = ( fn, delay, registerCancel ) => {
	const start = new Date().getTime()

	const loop = () => {
		const delta = new Date().getTime() - start

		if ( delta >= delay ) {
			fn()
			registerCancel( noop )
			return
		}

		const raf = requestAnimationFrame( loop )
		registerCancel( () => cancelAnimationFrame( raf ) )
	}

	const raf = requestAnimationFrame( loop )
	registerCancel( () => cancelAnimationFrame( raf ) )
}

const useCancelableScheduledWork = () => {
	const cancelCallback = useRef( noop )
	const registerCancel = fn => ( cancelCallback.current = fn )
	const cancelScheduledWork = () => cancelCallback.current()

	// Cancels the current scheduled work before the "unmount"
	useEffect( () => {
		return cancelScheduledWork
	}, [] )

	return [ registerCancel, cancelScheduledWork ]
}

const useSingleAndDoubleClick = ( { onClick, onDoubleClick, delay = 300 } ) => {
	const [ registerCancel, cancelScheduledRaf ] = useCancelableScheduledWork()

	const handleClick = () => {
		cancelScheduledRaf()
		requestTimeout( onClick, delay, registerCancel )
	}

	const handleDoubleClick = () => {
		cancelScheduledRaf()
		onDoubleClick()
	}

	return [ handleClick, handleDoubleClick ]
}

export default useSingleAndDoubleClick
