import { FC, memo, useState } from 'react'

const FIRST_BUTTON_BACKGROUND = { background: 'tomato' }
const CONTAINER_STYLES = { display: 'flex', flexDirection: 'column', gap: 10 }
const BUTTON_STYLES = { border: 'none', outline: 'none', color: 'white', borderRadius: 5 }

// Task
// If click to Button component Checkbox not re-render
// If click to Checkbox component Button not re-render

export const Task_2 = () => {
	const [firstCount, setFirstCount] = useState(0)

	const handlePlusCountValueClick = () => setFirstCount(prevFirstCount => prevFirstCount + 1)

	return (
		<div style={{ ...CONTAINER_STYLES } as any}>
			<div>{`Count equal: ${firstCount}`}</div>
			<Button onPlusCountValueClick={handlePlusCountValueClick} />
			<Checkbox />
		</div>
	)
}

export const Button: FC<{ onPlusCountValueClick: () => void }> = ({ onPlusCountValueClick }) => {
	return (
		<div>
			<button
				style={{ ...FIRST_BUTTON_BACKGROUND, ...BUTTON_STYLES }}
				onClick={onPlusCountValueClick}
			>
				Plus first counter
			</button>
		</div>
	)
}

export const Checkbox = memo(() => {
	console.log('Check Box')
	const [isChecked, setIsChecked] = useState(false)
	const handleSetIsChecked = () => setIsChecked(!isChecked)
	return (
		<input type='checkbox' checked={isChecked} onChange={handleSetIsChecked} />
	)
})
