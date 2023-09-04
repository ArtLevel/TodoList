type StateType = {
	age: number
	childrenCount: number
	name: string
}

type ActionType = {
	type: string
	[key: string]: any
}

export const userReducer = (state: StateType, action: ActionType) => {
	switch (action.type) {
		case 'INCREMENT-AGE': {
			state.age += 1
			return state
		}
		case 'INCREMENT-CHILDREN-COUNT': {
			state.childrenCount += 1
			return state
		}
		default:
			throw new Error(`I don't understand this action type`)
	}
}
