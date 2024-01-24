import { AppRootStateType } from 'app/reducers/store'

export const selectIsLoggedIn = (state: AppRootStateType) =>
	state.auth.isLoggedIn
