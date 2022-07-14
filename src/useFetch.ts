import { useCallback, useEffect, useRef, useState } from 'react'
import { useLatestRef } from './useLatestRef'

type Request = (...args: any[]) => Promise<any>
type Result<T> = T extends Promise<infer U> ? U : T
interface Options<F extends Request> {
	initialData?: any
	onlyManual?: boolean
	ready?: boolean
	loadingDelay?: number
	refreshDeps?: any[]
	defaultParams?: Parameters<F>
	onSuccess?(res: any): void
	onError?(err?: Error): void
	formatResult?: (res: any) => any
}

export function useFetch<F extends Request, O extends Options<F>>(request: F, options: O) {
	const { onlyManual = false, ready = true, loadingDelay = 0, refreshDeps = [] } = options
	const requestRef = useLatestRef(request)
	const optionsRef = useLatestRef(options)
	const _refreshDeps = onlyManual ? [] : refreshDeps

	const [data, setData] = useState(optionsRef.current.initialData)
	const [error, setError] = useState<Error>()
	const [loading, setLoading] = useState(false)
	const requestCount = useRef(0)

	const run = useCallback(
		(...args: Parameters<F>[]) => {
			if (!ready) return

			const preCount = requestCount.current
			const { initialData, onSuccess, onError, formatResult = x => x } = optionsRef.current
			setData(formatResult(initialData))
			setError(undefined)
			const loadingTimer = setTimeout(() => {
				setLoading(true)
			}, loadingDelay)

			requestRef
				.current(...args)
				.then((res: Result<ReturnType<F>>) => {
					if (requestCount.current !== preCount) return
					const formattedData = formatResult(res)
					onSuccess?.(formattedData)
					setData(formattedData)
				})
				.catch((err: Result<ReturnType<F>>) => {
					if (requestCount.current !== preCount) return
					onError?.(new Error(err))
					setError(new Error(err))
				})
				.finally(() => {
					if (requestCount.current !== preCount) return
					clearTimeout(loadingTimer)
					setLoading(false)
				})
		},
		[loadingDelay, optionsRef, ready, requestRef]
	)

	useEffect(
		() => {
			if (!onlyManual) {
				const { defaultParams } = optionsRef.current
				run(...defaultParams!)
			}
			return () => {
				requestCount.current += 1
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[onlyManual, run, ..._refreshDeps]
	)

	return { data, error, loading, run, mutate: setData }
}
