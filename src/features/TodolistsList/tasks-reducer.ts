import { TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType } from '../../api/todolists-api'
import { Dispatch } from 'redux'
import { AppRootStateType } from '../../app/store'
import { setAppStatusAC } from '../../app/app-reducer'
import { handleServerAppError, handleServerNetworkError } from '../../utils/error-utils'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
	addTodolistAC,
	AddTodolistActionType,
	removeTodolistAC,
	RemoveTodolistActionType,
	setTodolistsAC,
	SetTodolistsActionType
} from './todolists-reducer'

const initialState: TasksStateType = {}

const slice = createSlice({
	name: 'tasks',
	reducers: {
		removeTaskAC: (state, action: PayloadAction<{ todolistId: string, taskId: string }>) => {
			state[action.payload.todolistId] = state[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)
		},
		addTaskAC: (state, action: PayloadAction<{ task: TaskType }>) => {
			state[action.payload.task.todoListId].push(action.payload.task)
		},
		updateTaskAC: (state, action: PayloadAction<{
			taskId: string,
			model: UpdateDomainTaskModelType,
			todolistId: string
		}>) => {
			state[action.payload.todolistId] = state[action.payload.todolistId]
				.map(t => t.id === action.payload.taskId ? { ...t, ...action.payload.model } : t)
		},
		setTasksAC: (state, action: PayloadAction<{ tasks: Array<TaskType>, todolistId: string }>) => {
			state[action.payload.todolistId] = action.payload.tasks
		}
	},
	extraReducers: (builder) => {
		builder.addCase(addTodolistAC, (state, action) => {
			state[action.payload.todolist.id] = []
		})
		builder.addCase(removeTodolistAC, (state, action) => {
			delete state[action.payload.id]
		})
		builder.addCase(setTodolistsAC, (state, action) => {
			action.payload.todolists.forEach(tl => {
				state[tl.id] = []
			})
		})
	},
	initialState: initialState
})

export const tasksReducer = slice.reducer

// actions
export const removeTaskAC = slice.actions.removeTaskAC
export const addTaskAC = slice.actions.addTaskAC
export const updateTaskAC = slice.actions.updateTaskAC
export const setTasksAC = slice.actions.setTasksAC

// thunks
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
	dispatch(setAppStatusAC({ status: 'loading' }))
	todolistsAPI.getTasks(todolistId)
		.then((res) => {
			const tasks = res.data.items
			dispatch(setTasksAC({ tasks, todolistId }))
			dispatch(setAppStatusAC({ status: 'succeeded' }))
		})
}
export const removeTaskTC = (taskId: string, todolistId: string) => (dispatch: Dispatch) => {
	todolistsAPI.deleteTask(todolistId, taskId)
		.then(res => {
			const action = removeTaskAC({ taskId, todolistId })
			dispatch(action)
		})
}
export const addTaskTC = (title: string, todolistId: string) => (dispatch: Dispatch) => {
	dispatch(setAppStatusAC({ status: 'loading' }))
	todolistsAPI.createTask(todolistId, title)
		.then(res => {
			if (res.data.resultCode === 0) {
				const task = res.data.data.item
				const action = addTaskAC({ task })
				dispatch(action)
				dispatch(setAppStatusAC({ status: 'succeeded' }))
			} else {
				handleServerAppError(res.data, dispatch)
			}
		})
		.catch((error) => {
			handleServerNetworkError(error, dispatch)
		})
}
export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) =>
	(dispatch: Dispatch, getState: () => AppRootStateType) => {
		const state = getState()
		const task = state.tasks[todolistId].find(t => t.id === taskId)
		if (!task) {
			//throw new Error("task not found in the state");
			console.warn('task not found in the state')
			return
		}

		const apiModel: UpdateTaskModelType = {
			deadline: task.deadline,
			description: task.description,
			priority: task.priority,
			startDate: task.startDate,
			title: task.title,
			status: task.status,
			...domainModel
		}

		todolistsAPI.updateTask(todolistId, taskId, apiModel)
			.then(res => {
				if (res.data.resultCode === 0) {
					const action = updateTaskAC({ taskId, model: domainModel, todolistId })
					dispatch(action)
				} else {
					handleServerAppError(res.data, dispatch)
				}
			})
			.catch((error) => {
				handleServerNetworkError(error, dispatch)
			})
	}

// types
export type UpdateDomainTaskModelType = {
	title?: string
	description?: string
	status?: TaskStatuses
	priority?: TaskPriorities
	startDate?: string
	deadline?: string
}
export type TasksStateType = {
	[key: string]: Array<TaskType>
}
type ActionsType =
	| ReturnType<typeof removeTaskAC>
	| ReturnType<typeof addTaskAC>
	| ReturnType<typeof updateTaskAC>
	| AddTodolistActionType
	| RemoveTodolistActionType
	| SetTodolistsActionType
	| ReturnType<typeof setTasksAC>
