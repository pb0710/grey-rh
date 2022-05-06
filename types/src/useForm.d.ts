import { FormEventHandler } from 'react'
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
export interface Form {
	submit(): void
	getState(): State
	onSubmit: FormEventHandler<Element>
	subscribe(label: Field['label'], options: Field['options']): any
	unsubscribe(label: string): void
}
export declare function useForm(options: Options): Form
export {}
