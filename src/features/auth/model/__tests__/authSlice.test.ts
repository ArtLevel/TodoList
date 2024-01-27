import { authSlice, authThunks } from 'features/auth/model/authSlice'

let startState = {
	isLoggedIn: false,
	captcha: ''
}
beforeEach(() => {
	startState = {
		isLoggedIn: false,
		captcha: ''
	}
})

test('isLoggedIn should be correct', () => {
	const action = authThunks.login.fulfilled({ isLoggedIn: true }, '', {
		captcha: '',
		password: '',
		email: '',
		rememberMe: true
	})

	const endState = authSlice(startState, action)

	expect(endState.isLoggedIn).toBe(true)
})

test('captcha should be correct', () => {
	const action = authThunks.login.fulfilled({ isLoggedIn: true }, '', {
		captcha: '',
		password: '',
		email: '',
		rememberMe: true
	})

	const endState = authSlice(startState, action)

	expect(endState.captcha).toBe('')
})
