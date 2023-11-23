export type RequestStatusT = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
	status: 'loading' as RequestStatusT
}

type InitialStateT = typeof initialState

export const appReducer = (state: InitialStateT = initialState, action: ActionsT): InitialStateT => {
	switch (action.type) {
		case 'APP/SET-STATUS':
			return { ...state, status: action.status }
		default:
			return state
	}
}

export const setAppStatusAC = (status: RequestStatusT) => ({ type: 'APP/SET-STATUS', status } as const)

export type SetAppStatusT = ReturnType<typeof setAppStatusAC>

type ActionsT = SetAppStatusT
