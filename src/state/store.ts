import { combineReducers, createStore } from 'redux'
import { todolistsReducer } from './todolists-reducer'
import { tasksReducer } from './tasks-reducer'

const rootReducer = combineReducers({
	todolists: todolistsReducer,
	tasks: tasksReducer
})

export const store = createStore(rootReducer)

// @ts-ignore
window.store = store

