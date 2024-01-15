import { TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType } from 'api/todolists-api'
import { AppRootStateType } from 'app/store'
import { appActions } from 'app/appSlice'
import { handleServerAppError, handleServerNetworkError } from 'utils/error-utils'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { addTodolistTC, fetchTodolistsTC, removeTodolistTC } from 'features/TodolistsList/todolists-reducer'
import { GetThunkAPI } from '@reduxjs/toolkit/dist/createAsyncThunk'

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

export const addTaskTC = createAsyncThunk('tasks/addTask', async (param: {
	todolistId: string,
	title: string
}, thunkAPI) => {
	const { title, todolistId } = param

	try {
		thunkAPI.dispatch(appActions.setAppStatus({ status: 'loading' }))
		const res = await todolistsAPI.createTask(todolistId, title)
		if (res.data.resultCode === 0) {
			thunkAPI.dispatch(appActions.setAppStatus({ status: 'succeeded' }))
			
			return { task: res.data.data.item }
		} else {
			handleServerAppError(res.data, thunkAPI.dispatch)
		}
	} catch (error) {
		handleServerNetworkError(error as { message: string }, thunkAPI.dispatch)
	}
})

export const updateTaskTC = createAsyncThunk('tasks/updateTask', async (param: {
	taskId: string
	domainModel: UpdateDomainTaskModelType
	todolistId: string
}, thunkAPI: GetThunkAPI<{ state: AppRootStateType }>) => {
	const { taskId, todolistId, domainModel } = param

	const state = thunkAPI.getState()

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

	try {
		const res = await todolistsAPI.updateTask(todolistId, taskId, apiModel)
		if (res.data.resultCode === 0) {
			return { taskId, model: domainModel, todolistId }
		} else {
			handleServerAppError(res.data, thunkAPI.dispatch)
		}
	} catch (error) {
		handleServerNetworkError(error as { message: string }, thunkAPI.dispatch)
	}
})

const slice = createSlice({
	name: 'tasks',
	initialState: {} as TasksStateType,
	reducers: {
		addTask: (state, action: PayloadAction<{ task: TaskType }>) => {
			const tasks = state[action.payload.task.todoListId]
			tasks.unshift(action.payload.task)
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(addTodolistTC.fulfilled, (state, action) => {
				state[action.payload.todolist.id] = []
			})
			.addCase(removeTodolistTC.fulfilled, (state, action) => {
				delete state[action.payload.id]
			})
			.addCase(fetchTodolistsTC.fulfilled, (state, action) => {
				action.payload.todolists.forEach((tl: any) => {
					state[tl.id] = []
				})
			})
			.addCase(fetchTasks.fulfilled, (state, action) => {
				state[action.payload.todolistId] = action.payload.tasks
			})
			.addCase(addTaskTC.fulfilled, (state, action) => {
				if (action.payload) {
					const tasks = state[action.payload.task.todoListId]
					tasks.unshift(action.payload.task)
				}
			})
			.addCase(removeTaskTC.fulfilled, (state, action) => {
				const tasks = state[action.payload.todolistId]
				const index = tasks.findIndex((task) => task.id === action.payload.taskId)
				if (index !== -1) {
					tasks.splice(index, 1)
				}
			})
			.addCase(updateTaskTC.fulfilled, (state, action) => {
				if (action.payload) {
					const actionTaskId = action.payload.taskId

					const tasks = state[action.payload.todolistId]
					const index = tasks.findIndex((task) => task.id === actionTaskId)
					if (index !== -1) {
						tasks[index] = { ...tasks[index], ...action.payload.model }
					}
				}
			})
	}
})

export const tasksReducer = slice.reducer
export const tasksActions = slice.actions


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
