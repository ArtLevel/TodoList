import React, { ChangeEvent, memo, useState } from 'react'
import { TextField } from '@mui/material'


type EditableSpanPropsType = {
	value: string
	onChange: (newValue: string) => void
}

export const EditableSpan = memo((props: EditableSpanPropsType) => {
		console.log('Editable Span')
		let [editMode, setEditMode] = useState(false)
		let [title, setTitle] = useState(props.value)

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
			? <TextField value={title} onChange={changeTitle} autoFocus onBlur={activateViewMode} />
			: <span onDoubleClick={activateEditMode}>{props.value}</span>
	}
)