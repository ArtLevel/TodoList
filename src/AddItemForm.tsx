import TextField from '@mui/material/TextField/TextField'
import React, { ChangeEvent, KeyboardEvent, memo, useState } from 'react'
import { IconButton } from '@mui/material'
import { AddBox } from '@mui/icons-material'

type AddItemFormPropsType = {
	addItem: (title: string) => void
}

export const AddItemForm = memo((props: AddItemFormPropsType) => {
		let [title, setTitle] = useState('')
		let [error, setError] = useState<string | null>(null)

		console.log('Add Item form')
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
			if (error) setError(null)
			if (e.charCode === 13) {
				addItem()
			}
		}

		return <div>
			<TextField variant='outlined'
			           error={!!error}
			           value={title}
			           onChange={onChangeHandler}
			           onKeyPress={onKeyPressHandler}
			           label='Title'
			           helperText={error}
			/>
			<IconButton color='primary' onClick={addItem}>
				<AddBox />
			</IconButton>
		</div>
	}
)