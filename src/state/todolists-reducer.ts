import { todolistsAPI, TodolistType } from '../api/todolists-api'
import { Dispatch } from 'redux'

export type RemoveTodolistActionType = {
	type: 'REMOVE-TODOLIST',
	id: string
}
export type AddTodolistActionType = {
	type: 'ADD-TODOLIST',
	todolist: TodolistType
}
export type ChangeTodolistTitleActionType = {
	type: 'CHANGE-TODOLIST-TITLE',
	id: string
	title: string
}
export type ChangeTodolistFilterActionType = {
	type: 'CHANGE-TODOLIST-FILTER',
	id: string
	filter: FilterValuesType
}

export type SetTodoListsActionType = {
	type: 'SET-TODOLISTS',
	todolists: TodolistType[]
}

type ActionsType = RemoveTodolistActionType | AddTodolistActionType
	| ChangeTodolistTitleActionType
	| ChangeTodolistFilterActionType
	| SetTodoListsActionType

const initialState: Array<TodolistDomainType> = [
	/*{id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
	{id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}*/
]

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
	filter: FilterValuesType
}

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
	switch (action.type) {
		case 'REMOVE-TODOLIST': {
			return state.filter(tl => tl.id !== action.id)
		}
		case 'ADD-TODOLIST': {
			const newTodolist: TodolistDomainType = { ...action.todolist, filter: 'all' }
			return [newTodolist, ...state]
		}
		case 'CHANGE-TODOLIST-TITLE': {
			const todolist = state.find(tl => tl.id === action.id)
			if (todolist) {
				// если нашёлся - изменим ему заголовок
				todolist.title = action.title
			}
			return [...state]
		}
		case 'CHANGE-TODOLIST-FILTER': {
			const todolist = state.find(tl => tl.id === action.id)
			if (todolist) {
				// если нашёлся - изменим ему заголовок
				todolist.filter = action.filter
			}
			return [...state]
		}
		case 'SET-TODOLISTS': {
			return action.todolists.map(tl => {
				return {
					...tl,
					filter: 'all'
				}
			})
		}
		default:
			return state
	}
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
	return { type: 'REMOVE-TODOLIST', id: todolistId }
}
export const addTodolistAC = (todolist: TodolistType): AddTodolistActionType => {
	return { type: 'ADD-TODOLIST', todolist }
}
export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
	return { type: 'CHANGE-TODOLIST-TITLE', id: id, title: title }
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
	return { type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter }
}

export const setTodolistsAC = (todolists: TodolistType[]): SetTodoListsActionType => ({
	type: 'SET-TODOLISTS',
	todolists
})

export const fetchTodolistsTC = () => {
	return (dispatch: Dispatch) => todolistsAPI.getTodolists()
		.then((res) => {
			dispatch(setTodolistsAC(res.data))
		})
}

export const deleteTodolistTC = (todolistId: string) => {
	return (dispatch: Dispatch) => {
		todolistsAPI.deleteTodolist(todolistId).then(res => {
			dispatch(removeTodolistAC(todolistId))
		})
	}
}

export const addTodolistTC = (title: string) => {
	return (dispatch: Dispatch) => {
		todolistsAPI.createTodolist(title).then(res => {
			dispatch(addTodolistAC(res.data.data.item))
		})
	}
}

export const changeTodolistTitleTC = (todolistId: string, title: string) => {
	return (dispatch: Dispatch) => {
		todolistsAPI.updateTodolist(todolistId, title).then(res => {
			dispatch(changeTodolistTitleAC(todolistId, title))
		})
	}
}

export const changeTodolistStatusTC = (todolistId: string, title: string) => {
	return (dispatch: Dispatch) => {
		todolistsAPI.updateTodolist(todolistId, title).then(res => {
			dispatch(changeTodolistTitleAC(todolistId, title))
		})
	}
}
