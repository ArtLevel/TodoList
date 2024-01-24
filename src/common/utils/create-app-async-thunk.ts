import { AppDispatch, AppRootStateType } from 'app/reducers/store'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { BaseResponseType } from 'common/types/common.types'

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
	state: AppRootStateType
	dispatch: AppDispatch
	rejectValue: null | BaseResponseType
}>()
