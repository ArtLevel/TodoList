import { TodolistType } from '../App'
import { v1 } from 'uuid'

type ActionType = {
	type: string
	[key: string]: any
}

export const todoListsReducer = (state: TodolistType[], action: ActionType): TodolistType[] => {
	switch (action.type) {

		case 'REMOVE-TODOLIST':
			return state.filter(t => t.id !== action.id)
		case 'ADD-TODOLIST': {
			return [...state, { id: v1(), title: action.title, filter: 'all' }]
		}

		default:
			throw new Error(`I don't understand this action type`)
	}
}
