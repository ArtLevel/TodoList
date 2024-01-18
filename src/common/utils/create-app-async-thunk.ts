import { AppDispatch, AppRootStateType } from 'app/store'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
	state: AppRootStateType
	dispatch: AppDispatch
	rejectValue: null
}>()
