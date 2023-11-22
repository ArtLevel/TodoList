import { todolistsAPI, TodolistType } from '../api/todolists-api'
import { Dispatch } from 'redux'
import { RequestStatusT, setStatusAC, SetStatusAT } from './app-reducer'

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>
export type SetTodoListsActionType = ReturnType<typeof setTodolistsAC>

type ActionsType = RemoveTodolistActionType | AddTodolistActionType
	| ChangeTodolistTitleActionType
	| ChangeTodolistFilterActionType
	| SetTodoListsActionType
	| SetStatusAT

const initialState: Array<TodolistDomainType> = [
	/*{id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
	{id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}*/
]

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
	filter: FilterValuesType
	entityStatus: RequestStatusT
}

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
	switch (action.type) {
		case 'REMOVE-TODOLIST':
			return state.filter(tl => tl.id !== action.id)
		case 'ADD-TODOLIST':
			return [{ ...action.todolist, filter: 'all', entityStatus: 'idle' }, ...state]
		case 'CHANGE-TODOLIST-TITLE':
			return state.map(t => t.id === action.id ? { ...t, title: action.title } : t)
		case 'CHANGE-TODOLIST-FILTER':
			return state.map(t => t.id === action.id ? { ...t, filter: action.filter } : t)
		case 'SET-TODOLISTS':
			return action.todolists.map(tl => ({
					...tl,
					filter: 'all',
					entityStatus: 'idle'
				})
			)
		default:
			return state
	}
}

export const removeTodolistAC = (todolistId: string) => ({ type: 'REMOVE-TODOLIST', id: todolistId } as const)
export const addTodolistAC = (todolist: TodolistType) => ({ type: 'ADD-TODOLIST', todolist } as const)
export const changeTodolistTitleAC = (id: string, title: string) => ({
	type: 'CHANGE-TODOLIST-TITLE',
	id: id,
	title: title
} as const)
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => ({
	type: 'CHANGE-TODOLIST-FILTER',
	id: id,
	filter: filter
} as const)
export const setTodolistsAC = (todolists: TodolistType[]) => ({
	type: 'SET-TODOLISTS',
	todolists
} as const)

export const fetchTodolistsTC = () => {
	return (dispatch: Dispatch<ActionsType>) => {
		dispatch(setStatusAC('loading'))
		todolistsAPI.getTodolists()
			.then((res) => {
				dispatch(setTodolistsAC(res.data))
				dispatch(setStatusAC('succeeded'))
			})
	}
}

export const deleteTodolistTC = (todolistId: string) => {
	return (dispatch: Dispatch<ActionsType>) => {
		todolistsAPI.deleteTodolist(todolistId).then(res => {
			dispatch(removeTodolistAC(todolistId))
		})
	}
}

export const addTodolistTC = (title: string) => {
	return (dispatch: Dispatch<ActionsType>) => {
		dispatch(setStatusAC('loading'))
		todolistsAPI.createTodolist(title).then(res => {
			dispatch(addTodolistAC(res.data.data.item))
			dispatch(setStatusAC('succeeded'))
		})
	}
}

export const changeTodolistTitleTC = (todolistId: string, title: string) => {
	return (dispatch: Dispatch<ActionsType>) => {
		todolistsAPI.updateTodolist(todolistId, title).then(res => {
			dispatch(changeTodolistTitleAC(todolistId, title))
		})
	}
}
