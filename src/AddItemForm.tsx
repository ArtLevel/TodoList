import { Button, TextField } from '@mui/material'
import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import { Add } from '@mui/icons-material'

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
			size='small'
			variant='outlined'
			error={!!error}
			helperText={error}
			label={'Type Value'}
			value={title}
			onChange={onChangeHandler}
			onKeyPress={onKeyPressHandler}
		/>
		<Button onClick={addItem} variant='contained' size='medium'>
			<Add />
		</Button>
	</div>
}
