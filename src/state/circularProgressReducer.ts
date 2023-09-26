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

export const tasksReducer = (state = initialState, action: CircularProgressActionsType) => {
	switch (action.type) {
		case 'CIRCULAR-PROGRESS-OFF':
			return { ...state, isProgress: false }
		case 'CIRCULAR-PROGRESS-ON':
			return { ...state, isProgress: true }
		default:
			return state
	}
}

