import React, { FC, FormEvent } from 'react'
import { useForm } from '../../src'
import '../classes/index.scss'

interface CheckboxProps {
	value: boolean
	onChange(event: any): void
}
const CheckBox: FC<CheckboxProps> = ({ value, onChange }) => (
	<input
		type="checkbox"
		checked={value}
		onChange={(event: FormEvent) => {
			onChange({
				target: {
					value: event.target.checked
				}
			})
		}}
	/>
)

const ExampleIndex: FC = () => {
	const form = useForm({
		initialState: {
			nickname: '匿名',
			address: '',
			is_it_myself: false,
			gender: 'male'
		},
		onFulfilled(state) {
			console.log('fulfilled: ', state)
		},
		onFailed() {
			console.log('failed')
		},
		onStateChange(source) {
			console.log('changed: ', source.label, form.getState())
		}
	})
	return (
		<>
			<h1>Index</h1>
			<form onSubmit={form.submit}>
				<label>
					<span>Nickname: </span>
					<input {...form.subscribe('nickname', {})} />
				</label>
				<br />
				<label>
					<span>Address: </span>
					<input {...form.subscribe('address', {})} />
				</label>
				<br />
				<label>
					<span>Is it myself: </span>
					<CheckBox {...form.subscribe('is_it_myself', {})} />
				</label>
				<br />
				<label>
					<span>Gender: </span>
					<select {...form.subscribe('gender', {})}>
						<option value="female">female</option>
						<option value="male">male</option>
					</select>
				</label>
				<br />
				<button type="submit">submit</button>
			</form>
		</>
	)
}

export default ExampleIndex
