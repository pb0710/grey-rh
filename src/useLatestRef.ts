import { MutableRefObject, useEffect, useRef } from 'react'

export function useLatestRef<S>(state: S, initialState?: S): MutableRefObject<S> {
	const stateRef = useRef(initialState ?? state)
	useEffect(() => {
		stateRef.current = state
	}, [state])
	return stateRef
}
