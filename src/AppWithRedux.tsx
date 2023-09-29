import React, { useCallback } from 'react'
import './App.css'
import { TaskType, Todolist } from './Todolist'
import { AddItemForm } from './AddItemForm'
import {
	addTodolistAC,
	changeTodolistFilterAC,
	changeTodolistTitleAC,
	removeTodolistAC
} from './state/todolists-reducer'
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from './state/tasks-reducer'
import { useDispatch, useSelector } from 'react-redux'
import { AppRootStateType } from './state/store'
import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@mui/material'
import { Menu } from '@mui/icons-material'

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistType = {
	id: string
	title: string
	filter: FilterValuesType
}

export type TasksStateType = {
	[key: string]: Array<TaskType>
}

// const Fake = memo(() => {
// 	const arr = useSelector<AppRootStateType, TaskType[]>(s => s.tasks.count)
//
// 	return <h1>{arr.length}</h1>
// })

function AppWithRedux() {
	const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
	const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
	const dispatch = useDispatch()

	const removeTask = useCallback((id: string, todolistId: string) => {
		const action = removeTaskAC(id, todolistId)
		dispatch(action)
	}, [dispatch])

	const addTask = useCallback((title: string, todolistId: string) => {
		const action = addTaskAC(title, todolistId)
		dispatch(action)
	}, [dispatch])

	const changeStatus = useCallback((id: string, isDone: boolean, todolistId: string) => {
		const action = changeTaskStatusAC(id, isDone, todolistId)
		dispatch(action)
	}, [dispatch])

	const changeTaskTitle = useCallback((id: string, newTitle: string, todolistId: string) => {
		const action = changeTaskTitleAC(id, newTitle, todolistId)
		dispatch(action)
	}, [dispatch])

	const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
		const action = changeTodolistFilterAC(todolistId, value)
		dispatch(action)
	}, [dispatch])

	const removeTodolist = useCallback((id: string) => {
		const action = removeTodolistAC(id)
		dispatch(action)
	}, [dispatch])

	const changeTodolistTitle = useCallback((id: string, title: string) => {
		const action = changeTodolistTitleAC(id, title)
		dispatch(action)
	}, [dispatch])

	const addTodolist = useCallback((title: string) => {
		const action = addTodolistAC(title)
		dispatch(action)
	}, [dispatch])

	return (
		<div className='App'>
			<AppBar position='static'>
				<Toolbar>
					<IconButton edge='start' color='inherit' aria-label='menu'>
						<Menu />
					</IconButton>
					<Typography variant='h6'>
						News
					</Typography>
					<Button color='inherit'>Login</Button>
				</Toolbar>
			</AppBar>
			<Container fixed>
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
										changeFilter={changeFilter}
										addTask={addTask}
										filter={tl.filter}
										removeTodolist={removeTodolist}
										changeTodolistTitle={changeTodolistTitle}
									/>
								</Paper>
							</Grid>
						})
					}
				</Grid>
			</Container>
		</div>
	)
}

export default AppWithRedux
