import { TasksStateType } from '../App'
import { v1 } from 'uuid'

type RemoveTaskActionT = {
	type: 'REMOVE_TASK'
	todoListId: string
	taskId: string
}

type AddTaskActionT = {
	type: 'ADD_TASK'
	title: string
	todoListId: string
}

type changeTaskActionT = {
	type: 'CHANGE_TASK'
	taskId: string
	isDone: boolean
	todoListId: string
}

export type ActionsType =
	RemoveTaskActionT
	| AddTaskActionT
	| changeTaskActionT
export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
	switch (action.type) {
		case 'REMOVE_TASK':
			return { ...state, [action.todoListId]: state[action.todoListId].filter(t => t.id !== action.taskId) }
		case 'ADD_TASK':
			return {
				...state,
				[action.todoListId]: [{ id: v1(), title: action.title, isDone: false }, ...state[action.todoListId]]
			}
		case 'CHANGE_TASK': {
			return { ...state,
				[action.todoListId]: state[action.todoListId].map(t => t.id === action.taskId ? {
					...t,
					isDone: action.isDone
				} : t)
			}
		}
		default:
			throw new Error(`I don't understand this action type`)
	}
}

export const removeTaskAC = (taskId: string, todoListId: string): RemoveTaskActionT => ({
	type: 'REMOVE_TASK',
	todoListId,
	taskId
})

export const addTaskAC = (title: string, todoListId: string): AddTaskActionT => ({
	type: 'ADD_TASK',
	todoListId,
	title
})

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todoListId: string): changeTaskActionT => ({
	type: 'CHANGE_TASK',
	taskId,
	isDone,
	todoListId
})