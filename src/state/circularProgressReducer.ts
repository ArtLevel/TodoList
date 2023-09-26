export type CircularProgressOffAT = {
	type: 'CIRCULAR-PROGRESS-OFF'
}

export type CircularProgressOnAT = {
	type: 'CIRCULAR-PROGRESS-ON'
}

export type CircularProgressActionsType = CircularProgressOffAT | CircularProgressOnAT

const initialState = {
	isProgress: false
}

export const circularProgressReducer = (state = initialState, action: CircularProgressActionsType) => {
	switch (action.type) {
		case 'CIRCULAR-PROGRESS-OFF':
			debugger
			return { ...state, isProgress: false }
		case 'CIRCULAR-PROGRESS-ON':
			debugger
			return { ...state, isProgress: true }
		default:
			return state
	}
}

export const CircularProgressOnAC = (): CircularProgressOnAT => ({
	type: 'CIRCULAR-PROGRESS-ON'
})

export const CircularProgressOffAC = (): CircularProgressOffAT => ({
	type: 'CIRCULAR-PROGRESS-OFF'
})