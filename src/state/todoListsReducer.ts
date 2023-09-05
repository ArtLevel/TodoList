import { FilterValuesType, TodolistType } from '../App'
import { v1 } from 'uuid'

export type RemoveTodoListActionType = {
	type: 'REMOVE_TODOLIST'
	id: string
}

export type AddTodoListActionType = {
	type: 'ADD_TODOLIST'
	title: string
	todoListId: string
}

type ChangeTodoListTitleActionType = {
	type: 'CHANGE_TODOLIST_TITLE'
	id: string
	title: string
}

type ChangeTodoListFilterActionType = {
	type: 'CHANGE_TODOLIST_FILTER'
	id: string
	filter: FilterValuesType
}

export type ActionsType =
	RemoveTodoListActionType
	| AddTodoListActionType
	| ChangeTodoListTitleActionType
	| ChangeTodoListFilterActionType

export const todoListsReducer = (state: TodolistType[], action: ActionsType): TodolistType[] => {
	switch (action.type) {
		case 'REMOVE_TODOLIST':
			return state.filter(t => t.id !== action.id)
		case 'ADD_TODOLIST':
			return [...state, { id: action.todoListId, title: action.title, filter: 'all' }]
		case 'CHANGE_TODOLIST_TITLE':
			return state.map(t => t.id === action.id ? { ...t, title: action.title } : t)
		case 'CHANGE_TODOLIST_FILTER':
			return state.map(t => t.id === action.id ? { ...t, filter: action.filter } : t)
		default:
			return state
	}
}

export const removeTodoListAC = (todoListId: string): RemoveTodoListActionType => ({
	type: 'REMOVE_TODOLIST',
	id: todoListId
})

export const addTodoListAC = (title: string): AddTodoListActionType => <AddTodoListActionType>({
	type: 'ADD_TODOLIST',
	todoListId: v1(),
	title
})

export const changeTodoListTitleAC = (id: string, title: string): ChangeTodoListTitleActionType => ({
	type: 'CHANGE_TODOLIST_TITLE',
	id,
	title
})

export const changeTodoListFilterAC = (id: string, filter: FilterValuesType): ChangeTodoListFilterActionType => ({
	type: 'CHANGE_TODOLIST_FILTER',
	id,
	filter
})
