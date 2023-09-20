import { CombinedState, combineReducers, createStore } from 'redux'
import { todolistsReducer } from './todolists-reducer'
import { tasksReducer } from './tasks-reducer'

const rootReducer = combineReducers({
	todolists: todolistsReducer,
	tasks: tasksReducer
})

type AppRootState = ReturnType<typeof rootReducer & CombinedState<any>>

export const store: AppRootState = createStore(rootReducer)

// @ts-ignore
window.store = store
