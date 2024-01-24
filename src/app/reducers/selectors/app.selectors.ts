import { AppRootStateType } from 'app/reducers/store'

export const selectAppStatus = (state: AppRootStateType) => state.app.status
export const selectAppError = (state: AppRootStateType) => state.app.error
export const selectIsInitialized = (state: AppRootStateType) =>
	state.app.isInitialized
