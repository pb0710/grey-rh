import { MutableRefObject, useEffect, useRef } from 'react'

export function useLatestRef<T>(state: T, initialState?: T): MutableRefObject<T> {
	const stateRef = useRef(initialState ?? state)
	useEffect(() => {
		stateRef.current = state
	}, [state])
	return stateRef
}
