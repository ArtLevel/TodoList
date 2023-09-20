import React from 'react'
import './App.css'
import { TaskType, Todolist } from './Todolist'
import { AddItemForm } from './AddItemForm'
import { AppBar, Button, Container, Grid, Paper, Toolbar, Typography } from '@mui/material'
import IconButton from '@mui/material/IconButton/IconButton'
import { Menu } from '@mui/icons-material'
import {
	addTodolistAC,
	changeTodolistFilterAC,
	changeTodolistTitleAC,
	removeTodolistAC
} from './state/todolists-reducer'
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from './state/tasks-reducer'
import { AppRootStateType } from './state/store'
import { useDispatch, useSelector } from 'react-redux'

export type FilterValuesType = 'all' | 'active' | 'completed';
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

	const todolists = useSelector<AppRootStateType, TodolistType[]>(state => state.todolists)
	const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

	function removeTask(id: string, todolistId: string) {
		dispatch(removeTaskAC(id, todolistId))
	}

	function addTask(title: string, todolistId: string) {
		dispatch(addTaskAC(title, todolistId))
	}

	function changeStatus(id: string, isDone: boolean, todolistId: string) {
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

	function addTodolist(title: string) {
		dispatch(addTodolistAC(title))
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
								tasksForTodolist = allTodolistTasks.filter(t => !t.isDone)
							}
							if (tl.filter === 'completed') {
								tasksForTodolist = allTodolistTasks.filter(t => t.isDone)
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
