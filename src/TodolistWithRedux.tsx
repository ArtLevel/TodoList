import React, { ChangeEvent } from 'react'
import { AddItemForm } from './AddItemForm'
import { EditableSpan } from './EditableSpan'
import IconButton from '@mui/material/IconButton/IconButton'
import { Delete } from '@mui/icons-material'
import { Button, Checkbox } from '@mui/material'
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from './state/tasks-reducer'
import { useDispatch, useSelector } from 'react-redux'
import { FilterValuesType, TodolistType } from './AppWithRedux'
import { AppRootStateType } from './state/store'
import { changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC } from './state/todolists-reducer'


export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

type PropsType = {
	todolist: TodolistType
}

export function TodolistWithRedux(props: PropsType) {
	const dispatch = useDispatch()
	const tasks = useSelector<AppRootStateType, TaskType[]>(s => s.tasks[props.todolist.id])

	function removeTask(id: string, todolistId: string) {
		dispatch(removeTaskAC(id, todolistId))
	}

	function addTask(title: string, todolistId: string) {
		dispatch(addTaskAC(title, todolistId))
	}

	function changeTaskStatus(id: string, isDone: boolean, todolistId: string) {
		dispatch(changeTaskStatusAC(id, isDone, todolistId))
	}

	function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
		dispatch(changeTaskTitleAC(id, newTitle, todolistId))
	}

	function changeFilter(value: FilterValuesType, todolistId: string) {
		dispatch(changeTodolistFilterAC(todolistId, value))
	}

	function removeTodolist(id: string) {
		dispatch(removeTodolistAC(id))
	}

	function changeTodolistTitle(id: string, title: string) {
		dispatch(changeTodolistTitleAC(id, title))
	}


	const onAllClickHandler = () => changeFilter('all', props.todolist.id)
	const onActiveClickHandler = () => changeFilter('active', props.todolist.id)
	const onCompletedClickHandler = () => changeFilter('completed', props.todolist.id)

	return <div>
		<h3><EditableSpan value={props.todolist.title}
		                  onChange={(newValue) => changeTodolistTitle(props.todolist.id, newValue)} />
			<IconButton onClick={() => removeTodolist(props.todolist.id)}>
				<Delete />
			</IconButton>
		</h3>
		<AddItemForm addItem={(title) => addTask(title, props.todolist.id)} />
		<div>
			{
				tasks.map(t => {
					const onClickHandler = () => removeTask(t.id, props.todolist.id)
					const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
						let newIsDoneValue = e.currentTarget.checked
						changeTaskStatus(t.id, newIsDoneValue, props.todolist.id)
					}
					const onTitleChangeHandler = (newValue: string) => {
						changeTaskTitle(t.id, newValue, props.todolist.id)
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
		<div>
			<Button variant={props.todolist.filter === 'all' ? 'outlined' : 'text'}
			        onClick={onAllClickHandler}
			        color={'inherit'}
			>All
			</Button>
			<Button variant={props.todolist.filter === 'active' ? 'outlined' : 'text'}
			        onClick={onActiveClickHandler}
			        color={'primary'}>Active
			</Button>
			<Button variant={props.todolist.filter === 'completed' ? 'outlined' : 'text'}
			        onClick={onCompletedClickHandler}
			        color={'secondary'}>Completed
			</Button>
		</div>
	</div>
}


