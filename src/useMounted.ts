import { useEffect } from 'react'
import { useLatestRef } from './useLatestRef'

export function useMounted(callback: () => void): void {
	const callbackRef = useLatestRef(callback)
	useEffect(() => {
		callbackRef.current?.()
	}, [callbackRef])
}
