import React, { ChangeEvent } from 'react'
import { FilterValuesType } from './App'
import { AddItemForm } from './AddItemForm'
import { EditableSpan } from './EditableSpan'
import IconButton from '@mui/material/IconButton/IconButton'
import { Delete } from '@mui/icons-material'
import { Button, Checkbox } from '@mui/material'
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from './state/tasks-reducer'
import { useDispatch, useSelector } from 'react-redux'
import { AppRootState } from './state/store'


export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

type PropsType = {
	id: string
	title: string
	changeFilter: (value: FilterValuesType, todolistId: string) => void
	removeTodolist: (id: string) => void
	changeTodolistTitle: (id: string, newTitle: string) => void
	filter: FilterValuesType
}

export function Todolist(props: PropsType) {
	const dispatch = useDispatch()
	const tasks = useSelector<AppRootState, TaskType[]>(s => s.tasks[props.id])

	function removeTask(taskId: string, todolistId: string) {
		dispatch(removeTaskAC(taskId, todolistId))
	}

	function addTask(title: string) {
		dispatch(addTaskAC(title, props.id))
	}

	function changeTaskStatus(taskId: string, isDone: boolean, todolistId: string) {
		dispatch(changeTaskStatusAC(taskId, isDone, todolistId))
	}

	function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
		dispatch(changeTaskTitleAC(taskId, newTitle, todolistId))
	}

	const onAllClickHandler = () => props.changeFilter('all', props.id)
	const onActiveClickHandler = () => props.changeFilter('active', props.id)
	const onCompletedClickHandler = () => props.changeFilter('completed', props.id)

	return <div>
		<h3><EditableSpan value={props.title} onChange={(newValue) => props.changeTodolistTitle(props.id, newValue)} />
			<IconButton onClick={() => props.removeTodolist(props.id)}>
				<Delete />
			</IconButton>
		</h3>
		<AddItemForm addItem={addTask} />
		<div>
			{
				tasks.map(t => {
					const onClickHandler = () => removeTask(t.id, props.id)
					const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
						let newIsDoneValue = e.currentTarget.checked
						changeTaskStatus(t.id, newIsDoneValue, props.id)
					}
					const onTitleChangeHandler = (newValue: string) => {
						changeTaskTitle(t.id, newValue, props.id)
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
			<Button variant={props.filter === 'all' ? 'outlined' : 'text'}
			        onClick={onAllClickHandler}
			        color={'inherit'}
			>All
			</Button>
			<Button variant={props.filter === 'active' ? 'outlined' : 'text'}
			        onClick={onActiveClickHandler}
			        color={'primary'}>Active
			</Button>
			<Button variant={props.filter === 'completed' ? 'outlined' : 'text'}
			        onClick={onCompletedClickHandler}
			        color={'secondary'}>Completed
			</Button>
		</div>
	</div>
}


