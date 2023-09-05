import { v1 } from 'uuid'
import { FilterValuesType, TodolistType } from '../App'
import {
	addTodoListAC,
	changeTodoListFilterAC,
	changeTodoListTitleAC,
	removeTodoListAC,
	todoListsReducer
} from './todoListsReducer'

test('correct todoList should be removed', () => {
	const todoListId1 = v1()
	const todoListId2 = v1()

	const startState: TodolistType[] = [
		{ id: todoListId1, title: 'What to learn', filter: 'all' },
		{ id: todoListId2, title: 'What to buy', filter: 'all' }
	]

	const endState = todoListsReducer(startState, removeTodoListAC(todoListId1))

	expect(endState.length).toBe(1)
	expect(endState[0].id).toBe(todoListId2)
})
test('correct todoList should be add', () => {
	const todoListId1 = v1()
	const todoListId2 = v1()

	const newTodoListTitle = 'New TodoList'

	const startState: TodolistType[] = [
		{ id: todoListId1, title: 'What to learn', filter: 'all' },
		{ id: todoListId2, title: 'What to buy', filter: 'all' }
	]

	const endState = todoListsReducer(startState, addTodoListAC(newTodoListTitle))

	expect(endState.length).toBe(3)
	expect(endState[2].title).toBe(newTodoListTitle)
	expect(endState[2].filter).toBe('all')
})
test('correct todoList should change its name', () => {
	const todoListId1 = v1()
	const todoListId2 = v1()

	const newTodoListTitle = 'New TodoList'

	const startState: TodolistType[] = [
		{ id: todoListId1, title: 'What to learn', filter: 'all' },
		{ id: todoListId2, title: 'What to buy', filter: 'all' }
	]

	const endState = todoListsReducer(startState, changeTodoListTitleAC(todoListId2, newTodoListTitle))

	expect(endState[0].title).toBe('What to learn')
	expect(endState[1].title).toBe('New TodoList')
})
test('correct filter of todoList should be changed', () => {
	const todoListId1 = v1()
	const todoListId2 = v1()

	const newFilter: FilterValuesType = 'completed'

	const startState: TodolistType[] = [
		{ id: todoListId1, title: 'What to learn', filter: 'all' },
		{ id: todoListId2, title: 'What to buy', filter: 'all' }
	]

	const endState = todoListsReducer(startState, changeTodoListFilterAC(todoListId2, newFilter))

	expect(endState[0].filter).toBe('all')
	expect(endState[1].filter).toBe(newFilter)
})
