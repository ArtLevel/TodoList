import { FilterValuesType, TodolistType } from '../App'
import { v1 } from 'uuid'

export type RemoveTodolistActionType = {
	type: 'REMOVE-TODOLIST',
	id: string
}
export type AddTodolistActionType = {
	type: 'ADD-TODOLIST',
	title: string
	todoListId: string
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

type ActionsType =
	RemoveTodolistActionType
	| AddTodolistActionType
	| ChangeTodolistTitleActionType
	| ChangeTodolistFilterActionType;

const initialState: TodolistType[] = []

export const todolistsReducer = (state: TodolistType[] = initialState, action: ActionsType): TodolistType[] => {
	switch (action.type) {
		case 'REMOVE-TODOLIST':
			return state.filter(tl => tl.id != action.id)
		case 'ADD-TODOLIST':
			return [{ id: action.todoListId, title: action.title, filter: 'all' }, ...state]
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
		default:
			return state
	}
}

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
	return { type: 'REMOVE-TODOLIST', id: todolistId }
}
export const AddTodolistAC = (title: string): AddTodolistActionType => {
	return { type: 'ADD-TODOLIST', title: title, todoListId: v1() }
}
export const ChangeTodolistTitleAC = (todolistId: string, title: string): ChangeTodolistTitleActionType => {
	return { type: 'CHANGE-TODOLIST-TITLE', title: title, id: todolistId }
}
export const ChangeTodolistFilterAC = (todolistId: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
	return { type: 'CHANGE-TODOLIST-FILTER', filter: filter, id: todolistId }
}
