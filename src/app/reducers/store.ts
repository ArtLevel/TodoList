import { tasksReducer } from 'features/TodolistsList/reducers/tasks.reducer'
import { todolistsReducer } from 'features/TodolistsList/reducers/todolists.reducer'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { appReducer } from 'app/reducers/app.reducer'
import { authReducer } from 'features/auth/reducers/auth.reducer'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
	reducer: {
		tasks: tasksReducer,
		todolists: todolistsReducer,
		app: appReducer,
		auth: authReducer
	}
})

export type AppRootStateType = ReturnType<typeof store.getState>

export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>

// @ts-ignore
window.store = store
