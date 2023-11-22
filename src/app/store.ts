import { tasksReducer } from '../features/TodolistsList/Todolist/Task/tasks-reducer'
import { todolistsReducer } from '../features/TodolistsList/todolists-reducer'
import { AnyAction, applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import thunkMiddleware, { ThunkDispatch } from 'redux-thunk'
import { appReducer } from './app-reducer'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
	tasks: tasksReducer,
	todolists: todolistsReducer,
	app: appReducer
})
// непосредственно создаём store
export const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware))
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store

export type AppDispatchT = ThunkDispatch<AppRootStateType, unknown, AnyAction>

export const useAppDispatch = () => useDispatch<AppDispatchT>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector