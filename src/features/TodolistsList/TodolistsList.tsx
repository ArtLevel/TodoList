import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import { Todolist } from './Todolist/Todolist'
import React, { useCallback, useEffect } from 'react'
import {
	addTodolistTC,
	changeTodolistFilterAC,
	changeTodolistTitleTC,
	deleteTodolistTC,
	fetchTodolistsTC,
	FilterValuesType
} from './todolists-reducer'
import { useAppDispatch, useAppSelector } from '../../app/store'
import { addTaskTC, deleteTaskTC, updateTaskTC } from './Todolist/Task/tasks-reducer'
import { TaskStatuses } from '../../api/todolists-api'
import { AddItemForm } from '../../components/AddItemForm/AddItemForm'

export const TodoistsList = () => {
	const todolists = useAppSelector(state => state.todolists)
	const tasks = useAppSelector(state => state.tasks)
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(fetchTodolistsTC())
	}, [])

	const removeTask = useCallback(function(id: string, todolistId: string) {
		dispatch(deleteTaskTC(todolistId, id))
	}, [])

	const addTask = useCallback(function(title: string, todolistId: string) {
		dispatch(addTaskTC(todolistId, title))
	}, [])

	const changeStatus = useCallback(function(id: string, status: TaskStatuses, todolistId: string) {
		dispatch(updateTaskTC(id, { status }, todolistId))
	}, [])

	const changeTaskTitle = useCallback(function(id: string, newTitle: string, todolistId: string) {
		dispatch(updateTaskTC(id, { title: newTitle }, todolistId))
	}, [])

	const changeFilter = useCallback(function(value: FilterValuesType, todolistId: string) {
		const action = changeTodolistFilterAC(todolistId, value)
		dispatch(action)
	}, [])

	const removeTodolist = useCallback(function(id: string) {
		dispatch(deleteTodolistTC(id))
	}, [])

	const changeTodolistTitle = useCallback(function(id: string, title: string) {
		dispatch(changeTodolistTitleTC(id, title))
	}, [])

	const addTodolist = useCallback((title: string) => {
		dispatch(addTodolistTC(title))
	}, [dispatch])

	return <>
		<Grid container style={{ padding: '20px' }}>
			<AddItemForm addItem={addTodolist} />
		</Grid>
		<Grid container spacing={3}>
			{
				todolists.map(tl => {
					let allTodolistTasks = tasks[tl.id]

					return <Grid item key={tl.id}>
						<Paper style={{ padding: '10px' }}>
							<Todolist
								id={tl.id}
								title={tl.title}
								tasks={allTodolistTasks}
								removeTask={removeTask}
								changeFilter={changeFilter}
								addTask={addTask}
								changeTaskStatus={changeStatus}
								filter={tl.filter}
								removeTodolist={removeTodolist}
								changeTaskTitle={changeTaskTitle}
								changeTodolistTitle={changeTodolistTitle}
							/>
						</Paper>
					</Grid>
				})
			}
		</Grid>
	</>
}
