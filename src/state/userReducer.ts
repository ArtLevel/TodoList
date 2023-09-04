type StateType = {
	age: number
	childrenCount: number
	name: string
}

type ActionType = {
	type: string
	[key: string]: any
}

export const userReducer = (state: any, action: any) => {
	switch (action.type) {
		case 'BLABLA1': {

		}
		default:
			throw new Error(`I don't understand this action type`)
	}
}
