import { FormEvent, FormEventHandler, useEffect, useRef, useState } from 'react'

interface State {
	[key: string]: any
}
interface Field {
	label: string
	options: Record<string, any>
}
interface Options {
	initialState: State
	onFulfilled(state: State): void
	onFailed(): void
	onStateChange?(source: Field): void
}

export function useForm(options: Options) {
	const opts = useRef(options)
	useEffect(() => {
		opts.current = options
	}, [options])

	const [, setBol] = useState(true)
	const _update = () => {
		setBol(pre => !pre)
	}

	const state = useRef<State>(opts.current.initialState)
	const fields = useRef<Field[]>([])

	const getState = () => state.current

	const submit: FormEventHandler = event => {
		event.preventDefault()
		event.stopPropagation()
		opts.current.onFulfilled(state.current)
	}

	const subscribe = (label: Field['label'], options: Field['options']): any => {
		const field: Field = { label, options }
		fields.current.push(field)
		return {
			value: state.current[label],
			onChange(event: FormEvent) {
				const val = event?.target.value
				state.current[label] = val
				opts.current.onStateChange?.(field)
				_update()
			}
		}
	}
	const unsubscribe = (label: string) => {
		fields.current = fields.current.filter(field => field.label !== label)
	}

	return {
		getState,
		submit,
		subscribe,
		unsubscribe
	}
}
