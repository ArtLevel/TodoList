import React, { ChangeEvent, useCallback } from 'react'
import { Checkbox, IconButton } from '@mui/material'
import { Delete } from '@mui/icons-material'
import { TaskType } from 'features/TodolistsList/todolists.api'
import { EditableSpan } from 'common/components'
import { TaskStatuses } from 'common/enums'
import { useAppDispatch } from 'common/hooks'
import { tasksThunks } from 'features/TodolistsList/reducers/tasks.reducer'

type TaskPropsType = {
	task: TaskType
	todolistId: string
}

export const Task = React.memo((props: TaskPropsType) => {
	const dispatch = useAppDispatch()

	const onClickHandler = useCallback(
		() =>
			dispatch(
				tasksThunks.removeTask({
					taskId: props.task.id,
					todolistId: props.todolistId
				})
			),
		[props.task.id, props.todolistId]
	)

	const onChangeHandler = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			let newIsDoneValue = e.currentTarget.checked

			dispatch(
				tasksThunks.updateTask({
					taskId: props.task.id,
					todolistId: props.todolistId,
					domainModel: {
						status: newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New
					}
				})
			)
		},
		[props.task.id, props.todolistId]
	)

	const onTitleChangeHandler = useCallback(
		(newTitle: string) => {
			dispatch(
				tasksThunks.updateTask({
					taskId: props.task.id,
					todolistId: props.todolistId,
					domainModel: {
						title: newTitle
					}
				})
			)
		},
		[props.task.id, props.todolistId]
	)

	return (
		<div
			key={props.task.id}
			className={props.task.status === TaskStatuses.Completed ? 'is-done' : ''}
		>
			<Checkbox
				checked={props.task.status === TaskStatuses.Completed}
				color='primary'
				onChange={onChangeHandler}
			/>

			<EditableSpan value={props.task.title} onChange={onTitleChangeHandler} />
			<IconButton onClick={onClickHandler}>
				<Delete />
			</IconButton>
		</div>
	)
})
