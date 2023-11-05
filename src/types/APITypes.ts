export type TodoListT = {
	id: string
	title: string
	addedDate: string
	order: number
}

export type ResponseT<Data = {}> = {
	resultCode: number
	messages: string[]
	data: Data
}

export type TaskType = {
	description: string
	title: string
	completed: boolean
	status: number
	priority: number
	startDate: string
	deadline: string
	id: string
	todoListId: string
	order: number
	addedDate: string
}

export type UpdateTaskT = {
	title: string
	description: string
	completed: boolean
	status: number
	priority: number
	startDate: string
	deadline: string
}

export type GetTasksResponse = {
	error: string | null
	totalCount: number
	items: TaskType[]
}
