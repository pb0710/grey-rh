import React, { useState, cloneElement, FC, isValidElement } from 'react'
import { Form } from './useForm'

interface FieldProps {
	label: string
	options?: Record<string, any>
	form: Form
}

export const Field: FC<FieldProps> = props => {
	const { children, label, options = {}, form } = props

	const controller = form.subscribe(label, options)
	const [, setBol] = useState(true)
	const update = () => {
		setBol(pre => !pre)
	}
	const onFieldChange = (...args: any[]) => {
		controller?.onChange(...args)
		update()
	}
	return (
		<>
			{isValidElement(children) &&
				cloneElement(children, {
					...controller,
					onChange: onFieldChange
				})}
		</>
	)
}
