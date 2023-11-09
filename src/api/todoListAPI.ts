import axios from 'axios'
// DAL

type TodoListT = {
	id: string
	title: string
	addedDate: Date
	order: number
}

type ResponseT<T = {}> = {
	resultCode: number
	messages: string[]
	data: T
}

const instance = axios.create({
	baseURL: 'https://social-network.samuraijs.com/api/1.1/',
	withCredentials: true,
	headers: {
		'API-KEY': '6c25a8cb-5b12-4a93-b382-f9ada76279f8'
	}
})

export const todoListAPI = {
	getTodoLists() {
		return instance.get<TodoListT[]>(`todo-lists`)
	},
	createTodoList() {
		return instance.post<ResponseT<{ item: TodoListT }>>(`todo-lists`, {
			title: 'REACT'
		})
	},
	deleteTodoList(todoListId: string) {
		return instance.delete<ResponseT>(`todo-lists/${todoListId}`)
	},
	updateTodoList(todoListId: string) {
		return instance.put<ResponseT>(`todo-lists/${todoListId}`, {
			title: 'NEW TITLE'
		})
	}
}
