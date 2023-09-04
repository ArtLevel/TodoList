import { v1 } from 'uuid'
import { TodolistType } from '../App'
import { todoListsReducer } from './todoListsReducer'

test('correct todoList should be removed', () => {
	const todoListId1 = v1()
	const todoListId2 = v1()

	const startState: TodolistType[] = [
		{ id: todoListId1, title: 'What to learn', filter: 'all' },
		{ id: todoListId2, title: 'What to buy', filter: 'all' }
	]

	const endState = todoListsReducer(startState, { type: 'REMOVE-TODOLIST', id: todoListId1 })

	expect(endState.length).toBe(1)
	expect(endState[0].id).toBe(todoListId2)
})

test('correct todoList should be removed', () => {
	const todoListId1 = v1()
	const todoListId2 = v1()

	const newTodoListTitle = 'New TodoList'

	const startState: TodolistType[] = [
		{ id: todoListId1, title: 'What to learn', filter: 'all' },
		{ id: todoListId2, title: 'What to buy', filter: 'all' }
	]

	const endState = todoListsReducer(startState, { type: 'ADD-TODOLIST', title: newTodoListTitle })

	expect(endState.length).toBe(3)
	expect(endState[2].title).toBe(newTodoListTitle)
	expect(endState[2].filter).toBe('all')
})