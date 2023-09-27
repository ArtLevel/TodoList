import React, { memo, useCallback, useMemo } from 'react'
import { FilterValuesType } from './App'
import { AddItemForm } from './AddItemForm'
import { EditableSpan } from './EditableSpan'
import { IconButton } from '@mui/material'
import { Delete } from '@mui/icons-material'
import { OurButton } from './components/OurButton'
import { Task } from './Task'


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

	let tasks = props.tasks

	tasks = useMemo(() => {
		if (props.filter === 'active') {
			tasks = tasks.filter(t => t.isDone === false)
		}
		if (props.filter === 'completed') {
			tasks = tasks.filter(t => t.isDone === true)
		}
		return tasks
	}, [tasks, props.filter])

	if (props.filter === 'active') {
		tasks = props.tasks.filter(t => t.isDone === false)
	}
	if (props.filter === 'completed') {
		tasks = props.tasks.filter(t => t.isDone === true)
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
				tasks.map(t => <Task key={t.id} task={t} todolistId={props.id} />)
			}
		</div>
		<div style={{ paddingTop: '10px' }}>
			<OurButton
				onClick={onAllClickHandler}
				variant={props.filter === 'all' ? 'outlined' : 'text'}
				filter={'all'}
			>All</OurButton>
			<OurButton
				onClick={onActiveClickHandler}
				variant={props.filter === 'active' ? 'outlined' : 'text'}
				filter={'active'}
			>Active</OurButton>
			<OurButton
				onClick={onCompletedClickHandler}
				variant={props.filter === 'completed' ? 'outlined' : 'text'}
				filter={'completed'}
			>Completed</OurButton>
		</div>
	</div>
})
