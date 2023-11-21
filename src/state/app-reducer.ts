const initState: InitialStateT = {
	status: 'idle',
	error: 'some error'
}

export const appReducer = (state: InitialStateT = initState, action: ActionsType): InitialStateT => {
	switch (action.type) {
		case 'APP/SET-STATUS':
			return { ...state, status: action.status }
		case 'APP/SET-ERROR':
			return { ...state, error: action.error }
		default:
			return state
	}
}

export const setErrorAC = (error: string | null) => ({
	type: 'APP/SET-ERROR',
	error
} as const)
export const setStatusAC = (status: RequestStatusT) => ({
	type: 'APP/SET-STATUS',
	status
} as const)

export type RequestStatusT = 'idle' | 'loading' | 'succeeded' | 'failed'

export type InitialStateT = {
	status: RequestStatusT
	error: string | null
}


type ActionsType = ReturnType<typeof setErrorAC> | ReturnType<typeof setStatusAC>