import { Dispatch } from 'redux'
import { setAppStatusAC } from '../../app/app-reducer'
import { authAPI, LoginParamsType } from '../../api/todolists-api'
import { handleServerAppError, handleServerNetworkError } from '../../utils/error-utils'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { clearTasksAndTodolists } from '../../common/actions/common.actions'

const initialState = {
	isLoggedIn: false
}

const slice = createSlice({
	name: 'auth',
	initialState: initialState,
	reducers: {
		setIsLoggedInAC(state, action: PayloadAction<{ value: boolean }>) {
			state.isLoggedIn = action.payload.value
		}
	}
})

export const authReducer = slice.reducer
export const setIsLoggedInAC = slice.actions.setIsLoggedInAC

export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
	dispatch(setAppStatusAC({ status: 'loading' }))
	authAPI.login(data)
		.then(res => {
			if (res.data.resultCode === 0) {
				dispatch(setIsLoggedInAC({ value: true }))
				dispatch(setAppStatusAC({ status: 'succeeded' }))
			} else {
				handleServerAppError(res.data, dispatch)
			}
		})
		.catch((error) => {
			handleServerNetworkError(error, dispatch)
		})
}
export const logoutTC = () => (dispatch: Dispatch) => {
	dispatch(setAppStatusAC({ status: 'loading' }))
	authAPI.logout()
		.then(res => {
			if (res.data.resultCode === 0) {
				dispatch(setIsLoggedInAC({ value: false }))
				dispatch(clearTasksAndTodolists({ tasks: {}, todolists: [] }))
				dispatch(setAppStatusAC({ status: 'succeeded' }))
			} else {
				handleServerAppError(res.data, dispatch)
			}
		})
		.catch((error) => {
			handleServerNetworkError(error, dispatch)
		})
}
