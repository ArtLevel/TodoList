import { AppRootStateType } from 'app/model/store'

export const selectIsLoggedIn = (state: AppRootStateType) =>
	state.auth.isLoggedIn
