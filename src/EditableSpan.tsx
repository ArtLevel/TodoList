import React, { ChangeEvent, useState } from 'react'
import { TextField } from '@mui/material'

type EditableSpanPropsType = {
	value: string
	onChange: (newValue: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {
	const [editMode, setEditMode] = useState(false)
	const [title, setTitle] = useState(props.value)

	const activateEditMode = () => {
		setEditMode(true)
		setTitle(props.value)
	}
	const activateViewMode = () => {
		setEditMode(false)
		props.onChange(title)
	}
	const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
		setTitle(e.currentTarget.value)
	}

	return editMode
		? <TextField value={title} onChange={changeTitle} autoFocus onBlur={activateViewMode} size='small' />
		: <span onDoubleClick={activateEditMode}>{props.value}</span>
}
