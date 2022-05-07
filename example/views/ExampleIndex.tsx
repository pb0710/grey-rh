import React, { FC, FormEvent } from 'react'
import { useForm } from '../../src/useForm'
import '../classes/index.scss'
import { Field } from './Field'

interface CheckboxProps {
	value?: boolean
	onChange?(event: any): void
}
const CheckBox: FC<CheckboxProps> = ({ value, onChange }) => (
	<input
		type="checkbox"
		checked={value}
		onChange={(event: FormEvent<HTMLInputElement>) => {
			onChange?.({
				currentTarget: {
					value: event.currentTarget.checked
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
			<form onSubmit={form.onSubmit}>
				<label>
					<span>Nickname: </span>
					<Field form={form} label="nickname">
						<input />
					</Field>
				</label>
				<br />
				<label>
					<span>Address: </span>
					<Field form={form} label="address">
						<input />
					</Field>
				</label>
				<br />
				<label>
					<span>Is it myself: </span>
					<Field form={form} label="is_it_myself">
						<CheckBox />
					</Field>
				</label>
				<br />
				<label>
					<span>Gender: </span>
					<Field form={form} label="gender">
						<select>
							<option value="female">female</option>
							<option value="male">male</option>
						</select>
					</Field>
				</label>
				<br />
				<button type="submit">submit</button>
			</form>
		</>
	)
}

export default ExampleIndex
