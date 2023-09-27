import { Checkbox, IconButton } from '@mui/material'
import { EditableSpan } from './EditableSpan'
import { Delete } from '@mui/icons-material'
import React, { ChangeEvent, FC, memo } from 'react'
import { TaskType } from './Todolist'
import { useDispatch } from 'react-redux'
import { changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from './state/tasks-reducer'

interface ITask {
	task: TaskType
	todolistId: string
}

export const Task: FC<ITask> = memo(({ todolistId, task }) => {
	const dispatch = useDispatch()

	const onClickHandler = () => dispatch(removeTaskAC(task.id, todolistId))
	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		let newIsDoneValue = e.currentTarget.checked
		dispatch(changeTaskStatusAC(task.id, newIsDoneValue, todolistId))
	}
	const onTitleChangeHandler = (newValue: string) => {
		dispatch(changeTaskTitleAC(newValue, todolistId, task.id))
	}

	return <div className={task.isDone ? 'is-done' : ''}>
		<Checkbox
			checked={task.isDone}
			color='primary'
			onChange={onChangeHandler}
		/>

		<EditableSpan value={task.title} onChange={onTitleChangeHandler} />
		<IconButton onClick={onClickHandler}>
			<Delete />
		</IconButton>
	</div>
})