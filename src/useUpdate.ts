import { useState } from 'react'

export function useUpdate(): () => void {
	const [, setCount] = useState(0)
	const update = () => {
		setCount(count => count + 1)
	}
	return update
}
