import { TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType } from 'api/todolists-api'
import { AppThunk } from 'app/store'
import { appActions } from 'app/appSlice'
import { handleServerAppError, handleServerNetworkError } from 'utils/error-utils'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { todolistsActions } from 'features/TodolistsList/todolists-reducer'

export const fetchTasks = createAsyncThunk('tasks/fetchTasks',
	async (todolistId: string, thunkAPI) => {
		thunkAPI.dispatch(appActions.setAppStatus({ status: 'loading' }))

		const res = await todolistsAPI.getTasks(todolistId)
		const tasks = res.data.items

		thunkAPI.dispatch(appActions.setAppStatus({ status: 'succeeded' }))
		return { tasks, todolistId }

	})

export const removeTaskTC = createAsyncThunk('tasks/removeTask',
	async (param: { taskId: string, todolistId: string }) => {
		await todolistsAPI.deleteTask(param.todolistId, param.taskId)
		return { taskId: param.taskId, todolistId: param.todolistId }
	})

export const addTaskTC =
	(title: string, todolistId: string): AppThunk =>
		(dispatch) => {
			dispatch(appActions.setAppStatus({ status: 'loading' }))
			todolistsAPI
				.createTask(todolistId, title)
				.then((res) => {
					if (res.data.resultCode === 0) {
						dispatch(tasksActions.addTask({ task: res.data.data.item }))
						dispatch(appActions.setAppStatus({ status: 'succeeded' }))
					} else {
						handleServerAppError(res.data, dispatch)
					}
				})
				.catch((error) => {
					handleServerNetworkError(error, dispatch)
				})
		}

const slice = createSlice({
	name: 'tasks',
	initialState: {} as TasksStateType,
	reducers: {
		addTask: (state, action: PayloadAction<{ task: TaskType }>) => {
			const tasks = state[action.payload.task.todoListId]
			tasks.unshift(action.payload.task)
		},
		updateTask: (
			state,
			action: PayloadAction<{
				taskId: string
				model: UpdateDomainTaskModelType
				todolistId: string
			}>
		) => {
			const tasks = state[action.payload.todolistId]
			const index = tasks.findIndex((task) => task.id === action.payload.taskId)
			if (index !== -1) {
				tasks[index] = { ...tasks[index], ...action.payload.model }
			}
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(todolistsActions.addTodolist, (state, action) => {
				state[action.payload.todolist.id] = []
			})
			.addCase(todolistsActions.removeTodolist, (state, action) => {
				delete state[action.payload.id]
			})
			.addCase(todolistsActions.setTodolists, (state, action) => {
				action.payload.todolists.forEach((tl: any) => {
					state[tl.id] = []
				})
			})
			.addCase(fetchTasks.fulfilled, (state, action) => {
				state[action.payload.todolistId] = action.payload.tasks
			})
			.addCase(removeTaskTC.fulfilled, (state, action) => {
				const tasks = state[action.payload.todolistId]
				const index = tasks.findIndex((task) => task.id === action.payload.taskId)
				if (index !== -1) {
					tasks.splice(index, 1)
				}
			})
	}
})

export const tasksReducer = slice.reducer
export const tasksActions = slice.actions

// thunks

export const updateTaskTC =
	(taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string): AppThunk =>
		(dispatch, getState) => {
			const state = getState()
			const task = state.tasks[todolistId].find((t) => t.id === taskId)
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

			todolistsAPI
				.updateTask(todolistId, taskId, apiModel)
				.then((res) => {
					if (res.data.resultCode === 0) {
						const action = tasksActions.updateTask({ taskId, model: domainModel, todolistId })
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
