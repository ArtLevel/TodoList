import React from 'react'
import './App.css'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import { Menu } from '@mui/icons-material'
import { TaskType } from '../api/todolists-api'
import { LinearProgress } from '@mui/material'
import { CustomizedSnackbars } from '../ErrorSnackbar/ErrorSnackbar'
import { TodoistsList } from '../features/TodolistsList/TodolistsList'

export type TasksStateType = {
	[key: string]: Array<TaskType>
}

function App() {
	return (
		<div className='App'>
			<AppBar position='static'>
				<CustomizedSnackbars />
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
			{status === 'loading' && <LinearProgress />}
			<Container fixed>
				<TodoistsList />
			</Container>
		</div>
	)
}

export default App
