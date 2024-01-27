import React from 'react'
import { IconButton, TextField } from '@mui/material'
import { AddBox } from '@mui/icons-material'
import { useAddItemForm } from 'common/components/AddItemForm/lib/useAddItemForm'

type Props = {
	addItem: (title: string) => Promise<any> // { task: TaskType | todolist: TodolistType }
	disabled?: boolean
}

export const AddItemForm = React.memo(
	({ disabled = false, addItem }: Props) => {
		const { title, error, keyPressHandler, changeHandler, addItemHandler } =
			useAddItemForm({
				addItem
			})

		return (
			<div>
				<TextField
					variant='outlined'
					disabled={disabled}
					error={!!error}
					value={title}
					onChange={changeHandler}
					onKeyPress={keyPressHandler}
					label='Title'
					helperText={error}
				/>
				<IconButton
					color='primary'
					onClick={addItemHandler}
					disabled={disabled}
				>
					<AddBox />
				</IconButton>
			</div>
		)
	}
)
