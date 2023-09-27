import React, { ChangeEvent, memo, useCallback } from 'react'
import { FilterValuesType } from './App'
import { AddItemForm } from './AddItemForm'
import { EditableSpan } from './EditableSpan'
import { Checkbox, IconButton } from '@mui/material'
import { Delete } from '@mui/icons-material'
import { OurButton } from './components/OurButton'


export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

type PropsType = {
	id: string
	title: string
	tasks: Array<TaskType>
	removeTask: (taskId: string, todolistId: string) => void
	changeFilter: (value: FilterValuesType, todolistId: string) => void
	addTask: (title: string, todolistId: string) => void
	changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
	removeTodolist: (id: string) => void
	changeTodolistTitle: (id: string, newTitle: string) => void
	filter: FilterValuesType
	changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export const Todolist = memo((props: PropsType) => {
	const addTask = useCallback((title: string) => {
		props.addTask(title, props.id)
	}, [props.addTask, props.id])

	const removeTodolist = () => {
		props.removeTodolist(props.id)
	}
	const changeTodolistTitle = (title: string) => {
		props.changeTodolistTitle(props.id, title)
	}

	const onAllClickHandler = useCallback(() => props.changeFilter('all', props.id), [props.changeFilter, props.id])
	const onActiveClickHandler = useCallback(() => props.changeFilter('active', props.id), [props.changeFilter, props.id])
	const onCompletedClickHandler = useCallback(() => props.changeFilter('completed', props.id), [props.changeFilter, props.id])

	let tasksForTodolist = props.tasks

	if (props.filter === 'active') {
		tasksForTodolist = props.tasks.filter(t => t.isDone === false)
	}
	if (props.filter === 'completed') {
		tasksForTodolist = props.tasks.filter(t => t.isDone === true)
	}

	return <div>
		<h3><EditableSpan value={props.title} onChange={changeTodolistTitle} />
			<IconButton onClick={removeTodolist}>
				<Delete />
			</IconButton>
		</h3>
		<AddItemForm addItem={addTask} />
		<div>
			{
				tasksForTodolist.map(t => {
					const onClickHandler = () => props.removeTask(t.id, props.id)
					const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
						let newIsDoneValue = e.currentTarget.checked
						props.changeTaskStatus(t.id, newIsDoneValue, props.id)
					}
					const onTitleChangeHandler = (newValue: string) => {
						props.changeTaskTitle(t.id, newValue, props.id)
					}


					return <div key={t.id} className={t.isDone ? 'is-done' : ''}>
						<Checkbox
							checked={t.isDone}
							color='primary'
							onChange={onChangeHandler}
						/>

						<EditableSpan value={t.title} onChange={onTitleChangeHandler} />
						<IconButton onClick={onClickHandler}>
							<Delete />
						</IconButton>
					</div>
				})
			}
		</div>
		<div style={{ paddingTop: '10px' }}>
			<OurButton
				onClick={onAllClickHandler}
				filter={'all'} activeFilter={props.filter}
			>All</OurButton>
			<OurButton
				onClick={onActiveClickHandler}
				filter={'active'} activeFilter={props.filter}
			>Active</OurButton>
			<OurButton
				onClick={onCompletedClickHandler}
				filter={'completed'} activeFilter={props.filter}
			>Completed</OurButton>
		</div>
	</div>
})
