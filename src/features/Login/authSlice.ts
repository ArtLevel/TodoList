import { appActions } from 'app/appSlice'
import { authAPI, FieldErrorT, LoginParamsType } from 'api/todolists-api'
import { handleServerAppError, handleServerNetworkError } from 'utils/error-utils'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import { AxiosError } from 'axios'

export const loginTC = createAsyncThunk<{
	isLoggedIn: boolean
}, LoginParamsType, {
	rejectValue: { errors: string[], fieldsErrors?: FieldErrorT[] }
}>('auth/login', async (param: LoginParamsType, thunkAPI) => {
	thunkAPI.dispatch(appActions.setAppStatus({ status: 'loading' }))

	try {
		const res = await authAPI.login(param)

		if (res.data.resultCode === 0) {
			thunkAPI.dispatch(appActions.setAppStatus({ status: 'succeeded' }))

			return { isLoggedIn: true }

		} else {
			handleServerAppError(res.data, thunkAPI.dispatch)
			return thunkAPI.rejectWithValue({ errors: res.data.messages, fieldsErrors: res.data.fieldsErrors })
		}

	} catch (err: any) {
		const error: AxiosError = err

		handleServerNetworkError(error, thunkAPI.dispatch)
		return thunkAPI.rejectWithValue({ errors: [error.message], fieldsErrors: undefined })
	}

})

const slice = createSlice({
	name: 'auth',
	initialState: {
		isLoggedIn: false
	},
	reducers: {
		setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
			state.isLoggedIn = action.payload.isLoggedIn
		}
	},
	extraReducers: builder => {
		builder
			.addCase(loginTC.fulfilled, (state, action) => {
				state.isLoggedIn = action.payload.isLoggedIn
			})
	}
})

// thunks
export const logoutTC = (): AppThunk => (dispatch) => {
	dispatch(appActions.setAppStatus({ status: 'loading' }))
	authAPI
		.logout()
		.then((res) => {
			if (res.data.resultCode === 0) {
				dispatch(authActions.setIsLoggedIn({ isLoggedIn: false }))
				dispatch(appActions.setAppStatus({ status: 'succeeded' }))
			} else {
				handleServerAppError(res.data, dispatch)
			}
		})
		.catch((error) => {
			handleServerNetworkError(error, dispatch)
		})
}

export const authActions = slice.actions
export const authReducer = slice.reducer
