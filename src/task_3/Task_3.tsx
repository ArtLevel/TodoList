import { ChangeEvent, useState } from 'react'
import { SlowComponent } from './slowComponent/SlowComponent'

// find the problem and fix it as part of composition optimization, memo, children

export const Task_3 = () => {
	const [value, setValue] = useState('')
	const onChange = (event: ChangeEvent<HTMLInputElement>) => setValue(event.currentTarget.value)

	return (
		<div>
			<div>Lags when change value</div>
			<input type='text' value={value} onChange={onChange} />
			<SlowComponent />
		</div>
	)
}

const Form = () => {
	const [value, setValue] = useState('')
	const onChange = (event: ChangeEvent<HTMLInputElement>) => setValue(event.currentTarget.value)

	return <>
		<div>Lags when change value</div>
		<input type='text' value={value} onChange={onChange} />
	</>
}

// const Input = (props: { children: ReactNode }) => {
// 	const [value, setValue] = useState('')
// 	const onChange = (event: ChangeEvent<HTMLInputElement>) => setValue(event.currentTarget.value)
//
// 	return <>
// 		<input type='text' value={value} onChange={onChange} />
// 		{props.children}
// 	</>
// }
