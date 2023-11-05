import axios from 'axios';
import {ResponseT, TodoListT} from '../types/APITypes';

const instance = axios.create({
	withCredentials: true,
	baseURL: 'https://social-network.samuraijs.com/api/1.1/',
	headers: {
		'API-KEY': '6c25a8cb-5b12-4a93-b382-f9ada76279f8'
	}
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
		return instance.put<ResponseT<{}>>(`todo-lists/${todoListId}`, {title: 'HI !'})
	}
}
