import TextField from '@mui/material/TextField/TextField'
import React from 'react'
import { IconButton } from '@mui/material'
import { AddBox } from '@mui/icons-material'
import { useAdditemForm } from './hooks/useAdditemForm'

type AddItemFormPropsType = {
	addItem: (title: string) => void
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
	const { title, error, addItem, onKeyPressHandler, onChangeHandler } =
		useAdditemForm(props.addItem)

	return (
		<div>
			<TextField
				variant='outlined'
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
	)
})
