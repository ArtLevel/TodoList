export type RequestStatusT = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
	status: 'loading' as RequestStatusT,
	error: null as null | string
}

type InitialStateT = typeof initialState

export const appReducer = (state: InitialStateT = initialState, action: ActionsT): InitialStateT => {
	switch (action.type) {
		case 'APP/SET-STATUS':
			return { ...state, status: action.status }
		case 'APP/SET-ERROR':
			return { ...state, error: action.error }
		default:
			return state
	}
}

export const setAppStatusAC = (status: RequestStatusT) => ({ type: 'APP/SET-STATUS', status } as const)
export const setAppErrorAC = (error: null | string) => ({ type: 'APP/SET-ERROR', error } as const)

export type SetAppStatusAT = ReturnType<typeof setAppStatusAC>
export type SetAppErrorAT = ReturnType<typeof setAppErrorAC>

type ActionsT = SetAppStatusAT | SetAppErrorAT
