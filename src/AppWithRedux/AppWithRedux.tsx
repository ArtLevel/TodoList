import React from 'react'
import '../App.css'
import { TaskType, Todolist } from '../Todolist'
import { AddItemForm } from '../AddItemForm/AddItemForm'
import {
	AppBar,
	Button,
	Container,
	Grid,
	IconButton,
	Paper,
	Toolbar,
	Typography
} from '@mui/material'
import { Menu } from '@mui/icons-material'
import { useAppWithRedux } from './hooks/useAppWithRedux'

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistType = {
	id: string
	title: string
	filter: FilterValuesType
}

export type TasksStateType = {
	[key: string]: Array<TaskType>
}

/*
const Fake = React.memo(function() {
    console.log("FAKE")
    const arr = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks.count)
    return <h1>{arr.length}</h1>
})
*/

function AppWithRedux() {
	const {
		todolists,
		tasks,
		removeTodolist,
		removeTask,
		changeTodolistTitle,
		changeTaskTitle,
		addTodolist,
		changeFilter,
		addTask,
		changeStatus
	} = useAppWithRedux()

	return (
		<div className='App'>
			<AppBar position='static'>
				<Toolbar>
					<IconButton edge='start' color='inherit' aria-label='menu'>
						<Menu />
					</IconButton>
					<Typography variant='h6'>News</Typography>
					<Button color='inherit'>Login</Button>
				</Toolbar>
			</AppBar>
			<Container fixed>
				<Grid container style={{ padding: '20px' }}>
					<AddItemForm addItem={addTodolist} />
				</Grid>
				<Grid container spacing={3}>
					{todolists.map((tl) => {
						return (
							<Grid item key={tl.id}>
								<Paper style={{ padding: '10px' }}>
									<Todolist
										id={tl.id}
										title={tl.title}
										tasks={tasks[tl.id]}
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
						)
					})}
				</Grid>
			</Container>
		</div>
	)
}

export default AppWithRedux
