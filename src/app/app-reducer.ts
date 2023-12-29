import { Dispatch } from 'redux'
import { authAPI } from '../api/todolists-api'
import { setIsLoggedInAC } from '../features/Login/auth-reducer'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: InitialStateType = {
	status: 'idle',
	error: null,
	isInitialized: false
}

const slice = createSlice({
	name: 'app',
	reducers: {
		setStatusAC: (state, action: PayloadAction<{ status: InitialStateType['status'] }>) => {
			state.status = action.payload.status
		},
		setErrorAC: (state, action: PayloadAction<{ error: InitialStateType['error'] }>) => {
			state.error = action.payload.error
		},
		setAppInitializedAC: (state, action: PayloadAction<{ value: InitialStateType['isInitialized'] }>) => {
			state.isInitialized = action.payload.value
		}
	},
	initialState: initialState
})

export const appReducer = slice.reducer

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
	// происходит ли сейчас взаимодействие с сервером
	status: RequestStatusType
	// если ошибка какая-то глобальная произойдёт - мы запишем текст ошибки сюда
	error: string | null
	// true когда приложение проинициализировалось (проверили юзера, настройки получили и т.д.)
	isInitialized: boolean
}

export const setAppErrorAC = slice.actions.setErrorAC
export const setAppStatusAC = slice.actions.setStatusAC
export const setAppInitializedAC = slice.actions.setAppInitializedAC

export const initializeAppTC = () => (dispatch: Dispatch) => {
	authAPI.me().then(res => {
		if (res.data.resultCode === 0) {
			dispatch(setIsLoggedInAC({ value: true }))
		} else {

		}

		dispatch(setAppInitializedAC({ value: true }))
	})
}
