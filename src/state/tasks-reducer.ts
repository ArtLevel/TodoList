import { TasksStateType } from '../App'

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>

export type SecondActionType = {
	type: ''
}

type ActionsType = RemoveTaskActionType | SecondActionType;

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
	switch (action.type) {
		case 'REMOVE_TASK':
			return state
		case '':
			return state

		default:
			throw new Error('I don\'t understand this type')
	}
}

export const removeTaskAC = (taskId: string, todoListId: string) => {
	return { type: 'REMOVE_TASK', taskId, todoListId } as const
}

export const secondAC = (title: string): SecondActionType => {
	return { type: '' }
}