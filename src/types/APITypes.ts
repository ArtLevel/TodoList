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

export enum TaskStatuses {
	New = 0,
	InProgress = 1,
	Completed = 2,
	Draft = 3
}

export enum TodoTaskPriorities {
	Low = 0,
	Middle = 1,
	Hi = 2,
	Urgently = 3,
	Later = 4
}

export type TaskType = {
	description: string
	title: string
	status: TaskStatuses
	priority: TodoTaskPriorities
	startDate: string
	deadline: string
	id: string
	todoListId: string
	order: number
	addedDate: string
}

export type UpdateModelTaskT = {
	title: string
	description: string
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
