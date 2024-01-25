import { instance } from 'common/api'
import { BaseResponseType } from 'common/types'
import { UpdateDomainTaskModelType } from 'features/TodolistsList/model/tasks/tasks.reducer'
import { TaskPriorities, TaskStatuses } from 'common/enums'

export const tasksApi = {
	getTasks(todolistId: string) {
		return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
	},
	deleteTask(arg: RemoveTaskArgType) {
		return instance.delete<BaseResponseType>(
			`todo-lists/${arg.todolistId}/tasks/${arg.taskId}`
		)
	},
	createTask(arg: AddTaskArgType) {
		return instance.post<
			BaseResponseType<{
				item: TaskType
			}>
		>(`todo-lists/${arg.todolistId}/tasks`, { title: arg.title })
	},
	updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
		return instance.put<BaseResponseType<TaskType>>(
			`todo-lists/${todolistId}/tasks/${taskId}`,
			model
		)
	}
}

type GetTasksResponse = {
	error: string | null
	totalCount: number
	items: TaskType[]
}

export type AddTaskArgType = {
	title: string
	todolistId: string
}

export type UpdateTaskArgType = {
	taskId: string
	domainModel: UpdateDomainTaskModelType
	todolistId: string
}

export type RemoveTaskArgType = {
	todolistId: string
	taskId: string
}

export type TaskType = {
	description: string
	title: string
	status: TaskStatuses
	priority: TaskPriorities
	startDate: string
	deadline: string
	id: string
	todoListId: string
	order: number
	addedDate: string
}

export type UpdateTaskModelType = {
	title: string
	description: string
	status: TaskStatuses
	priority: TaskPriorities
	startDate: string
	deadline: string
}
