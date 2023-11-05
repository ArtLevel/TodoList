export type TodoListT = {
	id: string
	title: string
	addedDate: string
	order: number
}

export type ResponseT<Data> = {
	resultCode: number
	messages: string[]
	data: Data
}