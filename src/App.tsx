import React, { useState } from 'react'
import './App.css'
import { TaskType, Todolist } from './Todolist'
import { v1 } from 'uuid'
import { AddItemForm } from './AddItemForm'
import {
	AppBar,
	Box,
	Button,
	Container,
	createTheme,
	CssBaseline,
	Grid,
	IconButton,
	Paper,
	ThemeProvider,
	Toolbar,
	Typography
} from '@mui/material'
import { Menu } from '@mui/icons-material'
import { amber, teal } from '@mui/material/colors'

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistType = {
	id: string
	title: string
	filter: FilterValuesType
}

export type TasksStateType = {
	[key: string]: Array<TaskType>
}

function App() {
	const todolistId1 = v1()
	const todolistId2 = v1()

	const [todolists, setTodolists] = useState<Array<TodolistType>>([
		{ id: todolistId1, title: 'What to learn', filter: 'all' },
		{ id: todolistId2, title: 'What to buy', filter: 'all' }
	])
	const [tasks, setTasks] = useState<TasksStateType>({
		[todolistId1]: [
			{ id: v1(), title: 'HTML&CSS', isDone: true },
			{ id: v1(), title: 'JS', isDone: true }
		],
		[todolistId2]: [
			{ id: v1(), title: 'Milk', isDone: true },
			{ id: v1(), title: 'React Book', isDone: true }
		]
	})
	const [lightMode, setLightMode] = useState(true)

	const theme = createTheme(({
		palette: {
			primary: teal,
			secondary: amber,
			mode: lightMode ? 'light' : 'dark'
		}
	}))

	const removeTask = (id: string, todolistId: string) => {
		let todolistTasks = tasks[todolistId]
		tasks[todolistId] = todolistTasks.filter(t => t.id != id)
		setTasks({ ...tasks })
	}
	const addTask = (title: string, todolistId: string) => {
		let task = { id: v1(), title: title, isDone: false }
		let todolistTasks = tasks[todolistId]
		tasks[todolistId] = [task, ...todolistTasks]
		setTasks({ ...tasks })
	}
	const changeStatus = (id: string, isDone: boolean, todolistId: string) => {
		let todolistTasks = tasks[todolistId]
		let task = todolistTasks.find(t => t.id === id)
		if (task) {
			task.isDone = isDone
			setTasks({ ...tasks })
		}
	}
	const changeTaskTitle = (id: string, newTitle: string, todolistId: string) => {
		let todolistTasks = tasks[todolistId]
		let task = todolistTasks.find(t => t.id === id)
		if (task) {
			task.title = newTitle
			setTasks({ ...tasks })
		}
	}
	const changeFilter = (value: FilterValuesType, todolistId: string) => {
		let todolist = todolists.find(tl => tl.id === todolistId)
		if (todolist) {
			todolist.filter = value
			setTodolists([...todolists])
		}
	}
	const removeTodolist = (id: string) => {
		setTodolists(todolists.filter(tl => tl.id != id))
		delete tasks[id]
		setTasks({ ...tasks })
	}
	const changeTodolistTitle = (id: string, title: string) => {
		const todolist = todolists.find(tl => tl.id === id)
		if (todolist) {
			todolist.title = title
			setTodolists([...todolists])
		}
	}
	const addTodolist = (title: string) => {
		let newTodolistId = v1()
		let newTodolist: TodolistType = { id: newTodolistId, title: title, filter: 'all' }
		setTodolists([newTodolist, ...todolists])
		setTasks({
			...tasks,
			[newTodolistId]: []
		})
	}
	const toggleTheme = () => setLightMode(prevState => !prevState)

	const todolistsMapped = todolists.map(tl => {
		let allTodolistTasks = tasks[tl.id]
		let tasksForTodolist = allTodolistTasks

		if (tl.filter === 'active') {
			tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false)
		}
		if (tl.filter === 'completed') {
			tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true)
		}

		return <Grid item key={tl.id}>
			<Paper style={{ padding: '20px' }}>
				<Todolist
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

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Box>
				<AppBar position='static'>
					<Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
						<Typography variant='h6'>
							<IconButton edge='start' color='inherit' aria-label='menu'>
								<Menu />
							</IconButton>
							TodoList
						</Typography>
						<Box sx={{ display: 'flex', gap: '20px' }}>
							<Button color='inherit' variant='outlined'
							        onClick={toggleTheme}>{lightMode ? 'Set Dark' : 'Set Light'}</Button>
							<Button color='inherit' variant='outlined'>Login</Button>
						</Box>
					</Toolbar>
				</AppBar>
			</Box>
			<Container fixed>
				<Grid container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
					<AddItemForm addItem={addTodolist} />
				</Grid>
				<Grid container spacing={10}>
					{todolistsMapped}
				</Grid>
			</Container>
		</ThemeProvider>
	)
}

export default App
