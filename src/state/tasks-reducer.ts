import { TasksStateType } from '../App'
import { AddTodolistActionType, RemoveTodolistActionType, SetTodoListsActionType } from './todolists-reducer'
import { TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType } from '../api/todolists-api'
import { Dispatch } from 'redux'
import { AppRootStateType } from './store'
import { setErrorAC, SetErrorAT, setStatusAC, SetStatusAT } from './app-reducer'

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type UpdateTaskActionType = ReturnType<typeof updateTaskAC>
export type SetTasksActionType = ReturnType<typeof setTasksAC>

type ActionsType = RemoveTaskActionType | AddTaskActionType
	| UpdateTaskActionType
	| AddTodolistActionType
	| RemoveTodolistActionType
	| SetTodoListsActionType
	| SetTasksActionType
	| SetErrorAT
	| SetStatusAT

const initialState: TasksStateType = {
	/*"todolistId1": [
			{ id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
					startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
			{ id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
					startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
			{ id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
					startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
	],
	"todolistId2": [
			{ id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
					startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
			{ id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '',
					startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
			{ id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
					startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
	]*/

}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
	switch (action.type) {
		case 'REMOVE-TASK':
			return { ...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId) }
		case 'ADD-TASK':
			return { ...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]] }
		case 'UPDATE-TASK':
			return {
				...state,
				[action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? { ...t, ...action.model } : t)
			}
		case 'ADD-TODOLIST': {
			return {
				...state,
				[action.todolist.id]: []
			}
		}
		case 'REMOVE-TODOLIST': {
			const copyState = { ...state }
			delete copyState[action.id]
			return copyState
		}
		case 'SET-TODOLISTS': {
			const copyState = { ...state }

			action.todolists.forEach(tl => {
				copyState[tl.id] = []
			})

			return copyState
		}
		case 'SET-TASKS': {
			return {
				...state,
				[action.todolistId]: action.tasks
			}
		}
		default:
			return state
	}
}

// Actions

export const removeTaskAC = (taskId: string, todolistId: string) =>
	({ type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId } as const)

export const addTaskAC = (task: TaskType) =>
	({ type: 'ADD-TASK', task } as const)
export const updateTaskAC = (taskId: string, model: UpdateTaskModelType, todolistId: string) =>
	({ type: 'UPDATE-TASK', model, todolistId, taskId } as const)

export const setTasksAC = (tasks: TaskType[], todolistId: string) => ({
		type: 'SET-TASKS',
		todolistId,
		tasks
	} as const
)

// Thunks

export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
	dispatch(setStatusAC('loading'))
	todolistsAPI.getTasks(todolistId)
		.then(res => {
			dispatch(setTasksAC(res.data.items, todolistId))
			dispatch(setStatusAC('succeeded'))
		})
}

export const deleteTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
	todolistsAPI.deleteTask(todolistId, taskId).then(res => {
		const action = removeTaskAC(taskId, todolistId)
		dispatch(action)
	})
}

export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
	dispatch(setStatusAC('loading'))
	todolistsAPI.createTask(todolistId, title).then(res => {
		if (res.data.resultCode === 0) {
			const action = addTaskAC(res.data.data.item)
			dispatch(action)
			dispatch(setStatusAC('succeeded'))
		}
		if (res.data.resultCode !== 0) {
			if (res.data.messages.length) {
				dispatch(setErrorAC(res.data.messages[0]))
			} else {
				dispatch(setErrorAC('Some Error !'))
			}
			dispatch(setStatusAC('failed'))
		}
	})
}

export type UpdateDomainTaskModelType = {
	title?: string
	description?: string
	status?: TaskStatuses
	priority?: TaskPriorities
	startDate?: string
	deadline?: string
}

export const updateTaskTC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
	const state = getState()
	const task = state.tasks[todolistId].find(t => t.id === taskId)

	if (!task) {
		console.warn('Task not found in the state')
		return
	}

	const apiModel: UpdateTaskModelType = {
		title: task.title,
		deadline: task.deadline,
		startDate: task.deadline,
		priority: task.priority,
		description: task.description,
		status: task.status,
		...model
	}
	todolistsAPI.updateTask(todolistId, taskId, apiModel).then(res => {
		const action = updateTaskAC(taskId, apiModel, todolistId)
		dispatch(action)
	})
}
