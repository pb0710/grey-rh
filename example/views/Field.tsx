import React, { cloneElement, FC, isValidElement, HTMLAttributes } from 'react'
import { useUpdate } from '../../src'
import { Form } from '../../src/useForm'

interface FieldProps extends HTMLAttributes<HTMLElement> {
	label: string
	options?: Record<string, any>
	form: Form
}

export const Field: FC<FieldProps> = props => {
	const { children, label, options = {}, form } = props

	const controller = form.subscribe(label, options)
	const update = useUpdate()
	const onFieldChange = (arg: any) => {
		controller?.onChange(arg)
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
