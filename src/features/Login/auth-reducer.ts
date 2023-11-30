import { Dispatch } from 'redux'
import {
	SetAppErrorActionType,
	setAppInitializedAC,
	SetAppIsInitializedActionType,
	setAppStatusAC,
	SetAppStatusActionType
} from '../../app/app-reducer'
import { AuthAPI } from '../../api/todolists-api'
import { handleServerAppError, handleServerNetworkError } from '../../utils/error-utils'
import { LoginT } from './Login'

type ErrorT = {
	message: string
}

const initialState = {
	isLoggedIn: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
	switch (action.type) {
		case 'login/SET-IS-LOGGED-IN':
			return { ...state, isLoggedIn: action.value }
		default:
			return state
	}
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
	({ type: 'login/SET-IS-LOGGED-IN', value } as const)

// thunks
export const loginTC = (data: LoginT) => async (dispatch: Dispatch<ActionsType>) => {
	dispatch(setAppStatusAC('loading'))
	try {
		const res = await AuthAPI.login(data)
		if (res.data.resultCode === 0) {
			dispatch(setIsLoggedInAC(true))
			dispatch(setAppStatusAC('succeeded'))
		} else {
			handleServerAppError(res.data, dispatch)
		}
	} catch (e) {
		handleServerNetworkError((e as ErrorT), dispatch)
	}
}

export const authMeTC = () => async (dispatch: Dispatch<ActionsType>) => {
	dispatch(setAppStatusAC('loading'))
	try {
		const res = await AuthAPI.me()
		if (res.data.resultCode === 0) {
			dispatch(setIsLoggedInAC(true))
			dispatch(setAppStatusAC('succeeded'))
		} else {
			handleServerAppError(res.data, dispatch)
		}
	} catch (e) {
		handleServerNetworkError((e as ErrorT), dispatch)
	} finally {
		dispatch(setAppInitializedAC(true))
	}
}

export const logOutTC = () => async (dispatch: Dispatch<ActionsType>) => {
	dispatch(setAppStatusAC('loading'))
	try {
		const res = await AuthAPI.logOut()
		if (res.data.resultCode === 0) {
			dispatch(setIsLoggedInAC(false))
			dispatch(setAppStatusAC('succeeded'))
		} else {
			handleServerAppError(res.data, dispatch)
		}
	} catch (e) {
		handleServerNetworkError((e as ErrorT), dispatch)
	}
}


// types
type ActionsType =
	ReturnType<typeof setIsLoggedInAC>
	| SetAppStatusActionType
	| SetAppErrorActionType
	| SetAppIsInitializedActionType
