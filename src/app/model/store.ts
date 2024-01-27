import { configureStore } from '@reduxjs/toolkit'
import { tasksReducer } from 'features/TodolistsList/model/tasks/tasksSlice'
import { todolistsSlice } from 'features/TodolistsList/model/todolists/todolistsSlice'
import { appReducer } from 'app/model/appSlice'
import { authSlice } from 'features/auth/model/authSlice'

export const store = configureStore({
	reducer: {
		tasks: tasksReducer,
		todolists: todolistsSlice,
		app: appReducer,
		auth: authSlice
	}
})

export type AppRootStateType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
