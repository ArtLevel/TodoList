import { TasksStateType } from '../App'
import { v1 } from 'uuid'
import { AddTodoListActionType, RemoveTodoListActionType } from './todoListsReducer'

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

type ChangeTaskStatusActionT = {
	type: 'CHANGE_TASK_STATUS'
	taskId: string
	isDone: boolean
	todoListId: string
}

type ChangeTaskTitleActionT = {
	type: 'CHANGE_TASK_TITLE'
	taskId: string
	newTitle: string
	todoListId: string
}

export type ActionsType =
	RemoveTaskActionT
	| AddTaskActionT
	| ChangeTaskStatusActionT
	| ChangeTaskTitleActionT
	| AddTodoListActionType
	| RemoveTodoListActionType

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
	switch (action.type) {
		case 'REMOVE_TASK':
			return { ...state, [action.todoListId]: state[action.todoListId].filter(t => t.id !== action.taskId) }
		case 'ADD_TASK':
			return {
				...state,
				[action.todoListId]: [{ id: v1(), title: action.title, isDone: false }, ...state[action.todoListId]]
			}
		case 'CHANGE_TASK_STATUS': {
			return {
				...state,
				[action.todoListId]: state[action.todoListId].map(t => t.id === action.taskId ? {
					...t,
					isDone: action.isDone
				} : t)
			}
		}
		case 'CHANGE_TASK_TITLE':
			return {
				...state,
				[action.todoListId]: state[action.todoListId].map(t => t.id === action.taskId ? {
					...t,
					title: action.newTitle
				} : t)
			}
		case 'ADD_TODOLIST':
			return { [action.todoListId]: [], ...state }
		case 'REMOVE_TODOLIST': {
			const stateCopy = { ...state }
			delete stateCopy[action.id]
			return stateCopy
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

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todoListId: string): ChangeTaskStatusActionT => ({
	type: 'CHANGE_TASK_STATUS',
	taskId,
	isDone,
	todoListId
})

export const changeTaskTitleAC = (taskId: string, newTitle: string, todoListId: string): ChangeTaskTitleActionT => ({
	type: 'CHANGE_TASK_TITLE',
	taskId,
	newTitle,
	todoListId
})