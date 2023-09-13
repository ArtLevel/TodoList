import { TasksStateType } from '../App'
import { v1 } from 'uuid'

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>

export type addTaskActionType = ReturnType<typeof addTaskAC>

type ActionsType = RemoveTaskActionType | addTaskActionType;

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
	switch (action.type) {
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
