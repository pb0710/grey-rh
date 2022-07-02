import { FormEventHandler, useCallback, useRef } from 'react'
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
	onFailed?(): void
	onStateChange?(source: Field): void
}
export interface FieldController {
	defaultValue: any
	value: any
	onChange(arg: any): void
}
export interface Form {
	submit(): void
	getState(): State
	onSubmit: FormEventHandler<Element>
	subscribe(label: Field['label'], options?: Field['options']): FieldController
	unsubscribe(label: string): void
}

export function useForm(options: Options): Form {
	const opts = useLatestRef(options)

	const initialState = opts.current.initialState
	const state = useRef<State>(initialState)
	const fields = useRef<Field[]>([])

	const getState = useCallback(() => state.current, [])

	const submit = useCallback(() => {
		opts.current.onFulfilled(state.current)
	}, [opts])

	const onSubmit: FormEventHandler = useCallback(
		event => {
			event.preventDefault()
			event.stopPropagation()
			submit()
		},
		[submit]
	)

	const subscribe = useCallback(
		(label: Field['label'], options: Field['options'] = {}) => {
			const field: Field = { label, options }
			fields.current.push(field)
			return {
				defaultValue: initialState[label],
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
		},
		[initialState, opts]
	)
	const unsubscribe = useCallback((label: string) => {
		fields.current = fields.current.filter(field => field.label !== label)
	}, [])

	return {
		submit,
		getState,
		onSubmit,
		subscribe,
		unsubscribe
	}
}
