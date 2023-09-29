import { TasksStateType } from '../App'
import { v1 } from 'uuid'
import { AddTodolistActionType, RemoveTodolistActionType } from './todolists-reducer'

export type RemoveTaskActionType = {
	type: 'REMOVE-TASK',
	todolistId: string
	taskId: string
}

export type AddTaskActionType = {
	type: 'ADD-TASK',
	todolistId: string
	title: string
}

export type ChangeTaskStatusActionType = {
	type: 'CHANGE-TASK-STATUS',
	todolistId: string
	taskId: string
	isDone: boolean
}

export type ChangeTaskTitleActionType = {
	type: 'CHANGE-TASK-TITLE',
	todolistId: string
	taskId: string
	title: string
}

type ActionsType = RemoveTaskActionType | AddTaskActionType
	| ChangeTaskStatusActionType
	| ChangeTaskTitleActionType
	| AddTodolistActionType
	| RemoveTodolistActionType

const initialState: TasksStateType = {
	count: []
}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
	switch (action.type) {
		case 'REMOVE-TASK':
			return {
				...state,
				[action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)
			}
		case 'ADD-TASK':
			return {
				...state,
				[action.todolistId]: [{ id: v1(), title: action.title, isDone: false }, ...state[action.todolistId]]
			}

		case 'CHANGE-TASK-STATUS':
			return {
				...state,
				[action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
					...t,
					isDone: action.isDone
				} : t)
			}
		case 'CHANGE-TASK-TITLE':
			return {
				...state,
				[action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
					...t,
					title: action.title
				} : t)
			}

		case 'ADD-TODOLIST':
			return {
				...state,
				[action.todolistId]: []
			}

		case 'REMOVE-TODOLIST':
			const copyState = { ...state }
			delete copyState[action.id]
			return copyState

		default:
			return state
	}
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
	return { type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId }
}
export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
	return { type: 'ADD-TASK', title, todolistId }
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
	return { type: 'CHANGE-TASK-STATUS', isDone, todolistId, taskId }
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
	return { type: 'CHANGE-TASK-TITLE', title, todolistId, taskId }
}

