import { useEffect } from 'react'

export function useAsyncEffect(asyncFn: (...args: any[]) => any, deps: any[]): void {
	useEffect(() => {
		asyncFn()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [asyncFn, ...deps])
}
