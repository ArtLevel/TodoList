import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import { TextField } from '@mui/material'

type AddItemFormPropsType = {
	addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {

	let [title, setTitle] = useState('')
	let [error, setError] = useState<string | null>(null)
	const addItem = () => {
		if (title.trim() !== '') {
			props.addItem(title)
			setTitle('')
		} else {
			setError('Title is required')
		}
	}

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setTitle(e.currentTarget.value)
	}

	const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		setError(null)
		if (e.charCode === 13) {
			addItem()
		}
	}

	return <div>
		<TextField
			sx={{ mr: '5px' }}
			size='small'
			value={title}
			onChange={onChangeHandler}
			onKeyPress={onKeyPressHandler}
			className={error ? 'error' : ''}
		/>
		<button onClick={addItem}>+</button>

		{error && <div className='error-message'>{error}</div>}
	</div>
}
