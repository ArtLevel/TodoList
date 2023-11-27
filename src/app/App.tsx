import React from 'react'
import './App.css'
import { useAppSelector } from './store'
import { RequestStatusType } from './app-reducer'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import LinearProgress from '@mui/material/LinearProgress'
import { Menu } from '@mui/icons-material'
import { ErrorSnackbar } from '../components/ErrorSnackbar/ErrorSnackbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { TodolistsList } from '../features/TodolistsList/TodolistsList'
import { Login } from '../features/Login/Login'

function App() {
	const status = useAppSelector<RequestStatusType>((state) => state.app.status)
	return (
		<BrowserRouter>
			<div className='App'>
				<ErrorSnackbar />
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
					{status === 'loading' && <LinearProgress />}
				</AppBar>
				<Container fixed>
					<Routes>
						<Route path='/' element={<TodolistsList />} />
						<Route path='/login' element={<Login />} />
						<Route path='*' element={<h1>Page Not Found</h1>} />
					</Routes>
				</Container>
			</div>
		</BrowserRouter>
	)
}

export default App
