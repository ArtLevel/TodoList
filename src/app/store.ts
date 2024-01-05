import { tasksReducer } from 'features/TodolistsList/tasks-reducer'
import { todolistsReducer } from 'features/TodolistsList/todolists-reducer'
import { AnyAction, combineReducers } from 'redux'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { appSlice } from 'app/appSlice'
import { authSlice } from 'features/Login/authSlice'
import { configureStore } from '@reduxjs/toolkit'

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
	tasks: tasksReducer,
	todolists: todolistsReducer,
	app: appSlice,
	auth: authSlice
})
// непосредственно создаём store
// export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
export const store = configureStore({
	reducer: rootReducer
})
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof store.getState>

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AnyAction>

// export type AppDispatch = typeof store.dispatch
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>


// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store
