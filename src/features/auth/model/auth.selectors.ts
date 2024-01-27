import { AppRootStateType } from 'app/model/store'

export const selectIsLoggedIn = (state: AppRootStateType) =>
	state.auth.isLoggedIn

export const selectCaptcha = (state: AppRootStateType) => state.auth.captcha
