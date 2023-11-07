import axios from 'axios';
import {GetTasksResponse, ResponseT, TodoListT, UpdateModelTaskT} from '../types/APITypes';

const settings = {
	withCredentials: true,
	headers: {
		'API-KEY': '6c25a8cb-5b12-4a93-b382-f9ada76279f8'
	}
}

const instance = axios.create({
	baseURL: 'https://social-network.samuraijs.com/api/1.1/',
	...settings
})

export const todoListsAPI = {
	getTodoLists() {
		return instance.get<TodoListT[]>('todo-lists')
	},
	postCreateTodoList() {
		return instance.post<ResponseT<{ item: TodoListT }>>('todo-lists', {title: 'What is it ?'})
	},
	deleteTodoList(todoListId: string) {
		return instance.delete<ResponseT<{
			item: TodoListT
		}>>(`todo-lists/${todoListId}`)
	},
	updateTodoList(todoListId: string) {
		return instance.put<ResponseT>(`todo-lists/${todoListId}`, {title: 'HI !'})
	},
	getTasks(todoListId: string) {
		return instance.get<GetTasksResponse>(`todo-lists/${todoListId}/tasks`)
	},
	createTask(todoListId: string, taskTitle: string) {
		return instance.post <ResponseT<{
			item: TodoListT
		}>>(`todo-lists/${todoListId}/tasks`, {title: taskTitle})
	},
	deleteTask(todoListId: string, taskId: string) {
		return instance.delete<ResponseT>(`todo-lists/${todoListId}/tasks/${taskId}`)
	},
	updateTask(todoListId: string, taskId: string, newTask: UpdateModelTaskT) {
		return instance.put<ResponseT>(`todo-lists/${todoListId}/tasks/${taskId}`, newTask)
	}
}
