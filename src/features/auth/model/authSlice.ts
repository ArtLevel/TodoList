import { createSlice, isFulfilled, PayloadAction } from '@reduxjs/toolkit'
import { appActions } from 'app/model/appSlice'
import { authAPI, LoginParamsType } from 'features/auth/api/auth.api'
import { clearTasksAndTodolists } from 'common/actions'
import {
	createAppAsyncThunk,
	handleServerAppError,
	thunkTryCatch
} from 'common/utils'
import { ResultCode } from 'common/enums'

const login = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType>(
	'auth/login',
	async (arg, thunkAPI) => {
		const { dispatch, rejectWithValue } = thunkAPI
		return thunkTryCatch(thunkAPI, async () => {
			const res = await authAPI.login(arg)
			if (res.data.resultCode === ResultCode.Success) {
				return { isLoggedIn: true }
			} else {
				const isShowAppError = !res.data.fieldsErrors.length
				handleServerAppError(res.data, dispatch, isShowAppError)
				return rejectWithValue(res.data)
			}
		})
	}
)

const captcha = createAppAsyncThunk('auth/captcha', async (arg, thunkAPI) => {
	const { dispatch } = thunkAPI

	const res = await authAPI.captcha()
	dispatch(authActions.setCaptcha({ url: res.data.url }))
})

const logout = createAppAsyncThunk<{ isLoggedIn: boolean }, void>(
	'auth/logout',
	async (_, thunkAPI) => {
		const { dispatch, rejectWithValue } = thunkAPI

		dispatch(authActions.setCaptcha({ url: '' }))
		
		return thunkTryCatch(thunkAPI, async () => {
			const res = await authAPI.logout()
			if (res.data.resultCode === ResultCode.Success) {
				dispatch(clearTasksAndTodolists())
				return { isLoggedIn: false }
			} else {
				handleServerAppError(res.data, dispatch)
				return rejectWithValue(null)
			}
		})
	}
)

const initializeApp = createAppAsyncThunk<{ isLoggedIn: boolean }, void>(
	'auth/initializeApp',
	async (_, thunkAPI) => {
		const { dispatch, rejectWithValue } = thunkAPI
		return thunkTryCatch(thunkAPI, async () => {
			const res = await authAPI.me()
			if (res.data.resultCode === ResultCode.Success) {
				return { isLoggedIn: true }
			} else {
				return rejectWithValue(res.data)
			}
		}).finally(() => {
			dispatch(appActions.setAppInitialized({ isInitialized: true }))
		})
	}
)

const slice = createSlice({
	name: 'auth',
	initialState: {
		isLoggedIn: false,
		captcha: ''
	},
	reducers: {
		setCaptcha: (state, action: PayloadAction<{ url: string }>) => {
			state.captcha = action.payload.url
		}
	},
	extraReducers: (builder) => {
		builder.addMatcher(
			isFulfilled(
				authThunks.login,
				authThunks.logout,
				authThunks.initializeApp
			),
			(state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
				state.isLoggedIn = action.payload.isLoggedIn
			}
		)
	}
})

export const authSlice = slice.reducer
export const authActions = slice.actions
export const authThunks = { login, logout, initializeApp, captcha }
