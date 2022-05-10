import { FormEventHandler, useRef } from 'react'
import { useLatestRef } from './useLatestRef'

export interface State {
	[key: string]: any
}
export interface Field {
	label: string
	options: Record<string, any> // TODO:
}
export interface Options {
	initialState: State
	onFulfilled(state: State): void
	onFailed(): void
	onStateChange?(source: Field): void
}
export interface Form {
	submit(): void
	getState(): State
	onSubmit: FormEventHandler<Element>
	subscribe(label: Field['label'], options?: Field['options']): any
	unsubscribe(label: string): void
}

export function useForm(options: Options): Form {
	const opts = useLatestRef(options)

	const state = useRef<State>(opts.current.initialState)
	const fields = useRef<Field[]>([])

	const getState = () => state.current

	const submit = () => {
		opts.current.onFulfilled(state.current)
	}

	const onSubmit: FormEventHandler = event => {
		event.preventDefault()
		event.stopPropagation()
		submit()
	}

	const subscribe = (label: Field['label'], options: Field['options'] = {}) => {
		const field: Field = { label, options }
		fields.current.push(field)
		return {
			value: state.current[label],
			onChange(arg: any) {
				let val = arg
				if (arg?.nativeEvent instanceof Event) {
					val = (<HTMLSelectElement | HTMLInputElement>arg.target).value
				}
				state.current[label] = val
				opts.current.onStateChange?.(field)
			}
		}
	}
	const unsubscribe = (label: string) => {
		fields.current = fields.current.filter(field => field.label !== label)
	}

	return {
		submit,
		getState,
		onSubmit,
		subscribe,
		unsubscribe
	}
}
