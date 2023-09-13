import { TasksStateType } from '../App'
import { v1 } from 'uuid'
import { AddTodolistActionType } from './todolists-reducer'

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>

export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>

type ActionsType =
	RemoveTaskActionType
	| AddTaskActionType
	| ChangeTaskStatusActionType
	| ChangeTaskTitleActionType
	| AddTodolistActionType

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
	switch (action.type) {
		case 'ADD-TODOLIST':
			return { ...state, [action.todoListId]: [] }
		case 'REMOVE_TASK':
			return {
				...state,
				[action.todoListId]: state[action.todoListId]
					.filter(t => t.id === action.taskId)
			}
		case 'ADD_TASK':
			return {
				...state,
				[action.todoListId]: [{ id: v1(), title: action.title, isDone: false }, ...state[action.todoListId]]
			}
		case 'CHANGE_TASK_STATUS':
			return {
				...state,
				[action.todoListId]: state[action.todoListId].map(t => t.id === action.taskId ? {
					...t,
					isDone: action.isDone
				} : t)
			}
		case 'CHANGE_TASK_TITLE':
			return {
				...state,
				[action.todoListId]: state[action.todoListId].map(t => t.id === action.taskId ? {
					...t, title: action.newTitle
				} : t)
			}
		default:
			throw new Error('I don\'t understand this type')
	}
}

export const removeTaskAC = (taskId: string, todoListId: string) => {
	return { type: 'REMOVE_TASK', taskId, todoListId } as const
}

export const addTaskAC = (title: string, todoListId: string) => {
	return { type: 'ADD_TASK', title, todoListId } as const
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todoListId: string) => {
	return { type: 'CHANGE_TASK_STATUS', taskId, isDone, todoListId } as const
}

export const changeTaskTitleAC = (taskId: string, newTitle: string, todoListId: string) => {
	return { type: 'CHANGE_TASK_TITLE', taskId, newTitle, todoListId } as const
}
