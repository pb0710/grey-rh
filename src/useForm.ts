import { FormEvent, FormEventHandler, useEffect, useRef, useState } from 'react'

interface State {
	[key: string]: any
}
interface Field {
	label: string
	options: Record<string, any> // TODO:
}
interface Options {
	initialState: State
	onFulfilled(state: State): void
	onFailed(): void
	onStateChange?(source: Field): void
}
export interface Form {
	getState: () => State
	onSubmit: FormEventHandler<Element>
	subscribe: (label: Field['label'], options: Field['options']) => any
	unsubscribe: (label: string) => void
}

export function useForm(options: Options): Form {
	const opts = useRef(options)
	useEffect(() => {
		opts.current = options
	}, [options])

	const state = useRef<State>(opts.current.initialState)
	const fields = useRef<Field[]>([])

	const getState = () => state.current

	const onSubmit: FormEventHandler = event => {
		event.preventDefault()
		event.stopPropagation()
		opts.current.onFulfilled(state.current)
	}

	const subscribe = (label: Field['label'], options: Field['options']): any => {
		const field: Field = { label, options }
		fields.current.push(field)
		return {
			value: state.current[label],
			onChange(event: FormEvent<HTMLInputElement>) {
				const val = event.currentTarget.value
				state.current[label] = val
				opts.current.onStateChange?.(field)
			}
		}
	}
	const unsubscribe = (label: string) => {
		fields.current = fields.current.filter(field => field.label !== label)
	}

	return {
		getState,
		onSubmit,
		subscribe,
		unsubscribe
	}
}
