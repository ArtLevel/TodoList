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
type TodolistType = {
	id: string
	title: string
	filter: FilterValuesType
}

type TasksStateType = {
	[key: string]: Array<TaskType>
}

function App() {
	let todolistId1 = v1()
	let todolistId2 = v1()

	let [todolists, setTodolists] = useState<Array<TodolistType>>([
		{ id: todolistId1, title: 'What to learn', filter: 'all' },
		{ id: todolistId2, title: 'What to buy', filter: 'all' }
	])
	let [tasks, setTasks] = useState<TasksStateType>({
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

	function removeTask(id: string, todolistId: string) {
		//достанем нужный массив по todolistId:
		let todolistTasks = tasks[todolistId]
		// перезапишем в этом объекте массив для нужного тудулиста отфилтрованным массивом:
		tasks[todolistId] = todolistTasks.filter(t => t.id != id)
		// засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
		setTasks({ ...tasks })
	}

	function addTask(title: string, todolistId: string) {
		let task = { id: v1(), title: title, isDone: false }
		//достанем нужный массив по todolistId:
		let todolistTasks = tasks[todolistId]
		// перезапишем в этом объекте массив для нужного тудулиста копией, добавив в начало новую таску:
		tasks[todolistId] = [task, ...todolistTasks]
		// засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
		setTasks({ ...tasks })
	}

	function changeFilter(value: FilterValuesType, todolistId: string) {
		let todolist = todolists.find(tl => tl.id === todolistId)
		if (todolist) {
			todolist.filter = value
			setTodolists([...todolists])
		}
	}

	function changeStatus(id: string, isDone: boolean, todolistId: string) {
		//достанем нужный массив по todolistId:
		let todolistTasks = tasks[todolistId]
		// найдём нужную таску:
		let task = todolistTasks.find(t => t.id === id)
		//изменим таску, если она нашлась
		if (task) {
			task.isDone = isDone
			// засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
			setTasks({ ...tasks })
		}
	}

	function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
		//достанем нужный массив по todolistId:
		let todolistTasks = tasks[todolistId]
		// найдём нужную таску:
		let task = todolistTasks.find(t => t.id === id)
		//изменим таску, если она нашлась
		if (task) {
			task.title = newTitle
			// засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
			setTasks({ ...tasks })
		}
	}

	function removeTodolist(id: string) {
		// засунем в стейт список тудулистов, id которых не равны тому, который нужно выкинуть
		setTodolists(todolists.filter(tl => tl.id != id))
		// удалим таски для этого тудулиста из второго стейта, где мы храним отдельно таски
		delete tasks[id] // удаляем св-во из объекта... значением которого являлся массив тасок
		// засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
		setTasks({ ...tasks })
	}

	function changeTodolistTitle(id: string, title: string) {
		// найдём нужный todolist
		const todolist = todolists.find(tl => tl.id === id)
		if (todolist) {
			// если нашёлся - изменим ему заголовок
			todolist.title = title
			setTodolists([...todolists])
		}
	}

	function addTodolist(title: string) {
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
