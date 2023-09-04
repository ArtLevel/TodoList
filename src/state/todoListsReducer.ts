import { FilterValuesType, TodolistType } from '../App'
import { v1 } from 'uuid'

type RemoveTodoListActionType = {
	type: 'REMOVE-TODOLIST'
	id: string
}

type AddTodoListActionType = {
	type: 'ADD-TODOLIST'
	title: string
}

type ChangeTodoListTitleActionType = {
	type: 'CHANGE-TODOLIST-TITLE'
	id: string
	title: string
}

type ChangeTodoListFilterActionType = {
	type: 'CHANGE-TODOLIST-FILTER'
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
		case 'REMOVE-TODOLIST':
			return state.filter(t => t.id !== action.id)
		case 'ADD-TODOLIST': {
			return [...state, { id: v1(), title: action.title, filter: 'all' }]
		}
		case 'CHANGE-TODOLIST-TITLE':
			return state.map(t => t.id === action.id ? { ...t, title: action.title } : t)
		case 'CHANGE-TODOLIST-FILTER':
			return state.map(t => t.id === action.id ? { ...t, filter: action.filter } : t)
		default:
			throw new Error(`I don't understand this action type`)
	}
}
