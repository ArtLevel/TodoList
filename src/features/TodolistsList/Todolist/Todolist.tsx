import React, { useCallback, useEffect } from 'react'
import { Delete } from '@mui/icons-material'
import { Button, IconButton, PropTypes } from '@mui/material'
import { Task } from './Task/Task'
import {
	FilterValuesType,
	TodolistDomainType
} from 'features/TodolistsList/reducers/todolists.reducer'
import { tasksThunks } from 'features/TodolistsList/reducers/tasks.reducer'
import { TaskType } from 'features/TodolistsList/todolists.api'
import { TaskStatuses } from 'common/enums'
import { useAppDispatch } from 'common/hooks'
import { AddItemForm, EditableSpan } from 'common/components'

type PropsType = {
	todolist: TodolistDomainType
	tasks: TaskType[]
	changeFilter: (value: FilterValuesType, todolistId: string) => void
	addTask: (title: string, todolistId: string) => void
	removeTodolist: (id: string) => void
	changeTodolistTitle: (id: string, newTitle: string) => void
}

export const Todolist = React.memo(function (props: PropsType) {
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(tasksThunks.fetchTasks(props.todolist.id))
	}, [])

	const addTask = useCallback(
		(title: string) => {
			props.addTask(title, props.todolist.id)
		},
		[props.addTask, props.todolist.id]
	)

	const removeTodolist = () => {
		props.removeTodolist(props.todolist.id)
	}

	const changeTodolistTitle = useCallback(
		(title: string) => {
			props.changeTodolistTitle(props.todolist.id, title)
		},
		[props.todolist.id, props.changeTodolistTitle]
	)

	let tasksForTodolist = props.tasks

	if (props.todolist.filter === 'active') {
		tasksForTodolist = props.tasks.filter((t) => t.status === TaskStatuses.New)
	}
	if (props.todolist.filter === 'completed') {
		tasksForTodolist = props.tasks.filter(
			(t) => t.status === TaskStatuses.Completed
		)
	}

	const renderFilterButton = (params: {
		buttonFilter: FilterValuesType
		color: PropTypes.Color
		text: string
	}) => {
		const { text, buttonFilter, color } = params

		const onClickHandler = (newFilter: FilterValuesType) => {
			props.changeFilter(newFilter, props.todolist.id)
		}

		return (
			<Button
				variant={props.todolist.filter === buttonFilter ? 'outlined' : 'text'}
				onClick={() => onClickHandler(buttonFilter)}
				// @ts-ignore
				color={color}
			>
				{text}
			</Button>
		)
	}

	return (
		<div>
			<h3>
				<EditableSpan
					value={props.todolist.title}
					onChange={changeTodolistTitle}
				/>
				<IconButton
					onClick={removeTodolist}
					disabled={props.todolist.entityStatus === 'loading'}
				>
					<Delete />
				</IconButton>
			</h3>
			<AddItemForm
				addItem={addTask}
				disabled={props.todolist.entityStatus === 'loading'}
			/>
			<div>
				{tasksForTodolist.map((t) => (
					<Task key={t.id} task={t} todolistId={props.todolist.id} />
				))}
			</div>
			<div style={{ paddingTop: '10px' }}>
				{renderFilterButton({
					buttonFilter: 'all',
					text: 'All',
					color: 'inherit'
				})}
				{renderFilterButton({
					buttonFilter: 'active',
					text: 'Active',
					color: 'primary'
				})}
				{renderFilterButton({
					buttonFilter: 'completed',
					text: 'Completed',
					color: 'secondary'
				})}
			</div>
		</div>
	)
})
