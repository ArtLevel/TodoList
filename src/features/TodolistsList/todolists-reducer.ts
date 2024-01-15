import { todolistsAPI, TodolistType } from 'api/todolists-api'
import { appActions, RequestStatusType } from 'app/appSlice'
import { handleServerNetworkError } from 'utils/error-utils'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

export const fetchTodolistsTC = createAsyncThunk('todolists/fetchTodolists', async (arg, thunkAPI) => {

	try {
		thunkAPI.dispatch(appActions.setAppStatus({ status: 'loading' }))

		const res = await todolistsAPI.getTodolists()


		thunkAPI.dispatch(appActions.setAppStatus({ status: 'succeeded' }))
		return { todolists: res.data }
	} catch (error) {
		handleServerNetworkError(error as { message: string }, thunkAPI.dispatch)
		return { todolists: [] }
	}

})

export const removeTodolistTC = createAsyncThunk('todolists/removeTodolist', async (param: {
	id: string
}, thunkAPI) => {

	thunkAPI.dispatch(appActions.setAppStatus({ status: 'loading' }))
	todolistsActions.changeTodolistEntityStatus({ id: param.id, status: 'loading' })

	await todolistsAPI.deleteTodolist(param.id)

	thunkAPI.dispatch(appActions.setAppStatus({ status: 'succeeded' }))
	return { id: param.id }
})

export const addTodolistTC = createAsyncThunk('todolists/addTodolist', async (param: { title: string }, thunkAPI) => {
	thunkAPI.dispatch(appActions.setAppStatus({ status: 'loading' }))
	const res = await todolistsAPI.createTodolist(param.title)

	thunkAPI.dispatch(appActions.setAppStatus({ status: 'succeeded' }))
	return { todolist: res.data.data.item }
})

export const changeTodolistTitleTC = createAsyncThunk('todolists/changeTodolistTitle', async (param: {
	id: string,
	title: string
}, thunkAPI) => {
	await todolistsAPI.updateTodolist(param.id, param.title)

	return { id: param.id, title: param.title }
})


const slice = createSlice({
	name: 'todolists',
	initialState: [] as TodolistDomainType[],
	reducers: {
		changeTodolistFilter: (state, action: PayloadAction<{ id: string; filter: FilterValuesType }>) => {
			const todolist = state.find((todo) => todo.id === action.payload.id)
			if (todolist) {
				todolist.filter = action.payload.filter
			}
		},
		changeTodolistEntityStatus: (state, action: PayloadAction<{ id: string; status: RequestStatusType }>) => {
			const todolist = state.find((todo) => todo.id === action.payload.id)
			if (todolist) {
				todolist.entityStatus = action.payload.status
			}
		}
	},
	extraReducers: builder => {
		builder
			.addCase(fetchTodolistsTC.fulfilled, (state, action) => {
				return action.payload.todolists.map((tl) => ({ ...tl, filter: 'all', entityStatus: 'idle' }))
			})
			.addCase(removeTodolistTC.fulfilled, (state, action) => {
				const index = state.findIndex((todo) => todo.id === action.payload.id)
				if (index !== -1) {
					state.splice(index, 1)
				}
			})
			.addCase(addTodolistTC.fulfilled, (state, action) => {
				state.unshift({ ...action.payload.todolist, filter: 'all', entityStatus: 'idle' })
			})
			.addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
				const todolist = state.find((todo) => todo.id === action.payload.id)
				if (todolist) {
					todolist.title = action.payload.title
				}
			})
	}
})

export const todolistsReducer = slice.reducer
export const todolistsActions = slice.actions


export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
	filter: FilterValuesType
	entityStatus: RequestStatusType
}
