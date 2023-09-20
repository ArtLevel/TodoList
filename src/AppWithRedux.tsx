import React from 'react'
import './App.css'
import { TaskType, Todolist } from './Todolist'
import { AddItemForm } from './AddItemForm'
import AppBar from '@mui/material/AppBar/AppBar'
import { Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@mui/material'
import { Menu } from '@mui/icons-material'
import {
	AddTodolistAC,
	ChangeTodolistFilterAC,
	ChangeTodolistTitleAC,
	RemoveTodolistAC
} from './state/todolists-reducer'
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from './state/tasks-reducer'
import { useDispatch, useSelector } from 'react-redux'
import { AppRootState } from './state/store'

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodolistType = {
	id: string
	title: string
	filter: FilterValuesType
}

export type TasksStateType = {
	[key: string]: Array<TaskType>
}

function AppWithRedux() {
	const dispatch = useDispatch()

	const todolists = useSelector<AppRootState, TodolistType[]>(s => s.todolists)
	const tasks = useSelector<AppRootState, TasksStateType>(s => s.tasks)

	function removeTask(taskId: string, todolistId: string) {
		dispatch(removeTaskAC(taskId, todolistId))
	}

	function addTask(title: string, todolistId: string) {
		dispatch(addTaskAC(title, todolistId))
	}

	function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
		dispatch(changeTaskStatusAC(taskId, isDone, todolistId))
	}

	function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
		dispatch(changeTaskTitleAC(taskId, newTitle, todolistId))
	}

	function changeFilter(value: FilterValuesType, todolistId: string) {
		dispatch(ChangeTodolistFilterAC(todolistId, value))
	}

	function removeTodolist(todolistId: string) {
		dispatch(RemoveTodolistAC(todolistId))
	}

	function changeTodolistTitle(todolistId: string, title: string) {
		dispatch(ChangeTodolistTitleAC(todolistId, title))
	}

	function addTodolist(title: string) {
		dispatch(AddTodolistAC(title))
	}

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
							let tasksForTodolist = allTodolistTasks

							if (tl.filter === 'active') {
								tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false)
							}
							if (tl.filter === 'completed') {
								tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true)
							}

							return <Grid key={tl.id} item>
								<Paper style={{ padding: '10px' }}>
									<Todolist
										key={tl.id}
										id={tl.id}
										title={tl.title}
										tasks={tasksForTodolist}
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
			</Container>
		</div>
	)
}

export default AppWithRedux
