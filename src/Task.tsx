import { Checkbox, IconButton } from '@mui/material'
import { EditableSpan } from './EditableSpan'
import { Delete } from '@mui/icons-material'
import React, { ChangeEvent, FC, memo, useCallback } from 'react'
import { TaskType } from './Todolist'
import { useDispatch } from 'react-redux'
import { changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from './state/tasks-reducer'

interface ITask {
	task: TaskType
	todolistId: string
}

export const Task: FC<ITask> = memo(({ task, todolistId }) => {
	const dispatch = useDispatch()

	const onClickHandler = () => dispatch(removeTaskAC(task.id, todolistId))
	const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		let newIsDoneValue = e.currentTarget.checked
		dispatch(changeTaskStatusAC(task.id, newIsDoneValue, todolistId))
	}, [dispatch, task.id, todolistId])
	const onTitleChangeHandler = useCallback((newValue: string) => {
		dispatch(changeTaskTitleAC(task.id, newValue, todolistId))
	}, [dispatch, task.id, todolistId])

	return <div key={task.id} className={task.isDone ? 'is-done' : ''}>
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