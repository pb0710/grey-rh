import { FC, HTMLAttributes } from 'react'
import { Form } from './useForm'
interface FieldProps extends HTMLAttributes<HTMLElement> {
	label: string
	options?: Record<string, any>
	form: Form
}
export declare const Field: FC<FieldProps>
export {}
