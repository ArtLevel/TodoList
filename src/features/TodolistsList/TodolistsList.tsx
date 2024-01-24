import React, { useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import {
	FilterValuesType,
	todolistsActions,
	todolistsThunks
} from 'features/TodolistsList/reducers/todolists.reducer'
import { tasksThunks } from 'features/TodolistsList/reducers/tasks.reducer'
import { Grid, Paper } from '@mui/material'
import { AddItemForm } from 'common/components'
import { Todolist } from './Todolist/Todolist'
import { Navigate } from 'react-router-dom'
import { useAppDispatch } from 'common/hooks'
import { selectIsLoggedIn } from 'features/auth/reducers/selectors/auth.selectors'
import { selectTasks } from 'features/TodolistsList/reducers/selectors/tasks.selectors'
import { selectTodolists } from 'features/TodolistsList/reducers/selectors/todolists.selectors'

export const TodolistsList = () => {
	const todolists = useSelector(selectTodolists)
	const tasks = useSelector(selectTasks)
	const isLoggedIn = useSelector(selectIsLoggedIn)

	const dispatch = useAppDispatch()

	useEffect(() => {
		if (!isLoggedIn) {
			return
		}
		dispatch(todolistsThunks.fetchTodolists())
	}, [])

	const addTask = useCallback(function (title: string, todolistId: string) {
		dispatch(tasksThunks.addTask({ title, todolistId }))
	}, [])

	const changeFilter = useCallback(function (
		filter: FilterValuesType,
		id: string
	) {
		dispatch(todolistsActions.changeTodolistFilter({ id, filter }))
	}, [])

	const removeTodolist = useCallback(function (id: string) {
		dispatch(todolistsThunks.removeTodolist(id))
	}, [])

	const changeTodolistTitle = useCallback(function (id: string, title: string) {
		dispatch(todolistsThunks.changeTodolistTitle({ id, title }))
	}, [])

	const addTodolist = useCallback(
		(title: string) => {
			dispatch(todolistsThunks.addTodolist(title))
		},
		[dispatch]
	)

	if (!isLoggedIn) {
		return <Navigate to={'/login'} />
	}

	return (
		<>
			<Grid container style={{ padding: '20px' }}>
				<AddItemForm addItem={addTodolist} />
			</Grid>
			<Grid container spacing={3}>
				{todolists.map((tl) => {
					let allTodolistTasks = tasks[tl.id]

					return (
						<Grid item key={tl.id}>
							<Paper style={{ padding: '10px' }}>
								<Todolist
									todolist={tl}
									tasks={allTodolistTasks}
									changeFilter={changeFilter}
									addTask={addTask}
									removeTodolist={removeTodolist}
									changeTodolistTitle={changeTodolistTitle}
								/>
							</Paper>
						</Grid>
					)
				})}
			</Grid>
		</>
	)
}
