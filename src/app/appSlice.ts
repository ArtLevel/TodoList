import { authAPI } from 'api/todolists-api'
import { authActions } from 'features/Login/authSlice'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export const initializeAppTC = createAsyncThunk('app/initializeApp', async (param, { dispatch }) => {
	const res = await authAPI.me()
	if (res.data.resultCode === 0) {
		dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }))
	} else {

	}
	dispatch(appActions.setAppInitialized({ isInitialized: true }))
})

const slice = createSlice({
	name: 'app',
	initialState: {
		status: 'idle' as RequestStatusType,
		error: null as string | null,
		isInitialized: false
	},
	reducers: {
		setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
			state.error = action.payload.error
		},
		setAppStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
			state.status = action.payload.status
		},
		setAppInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
			state.isInitialized = action.payload.isInitialized
		}
	}
})


export const appReducer = slice.reducer
export const appActions = slice.actions
export type AppState = ReturnType<typeof slice.getInitialState>
