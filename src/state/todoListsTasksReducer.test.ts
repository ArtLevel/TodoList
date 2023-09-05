import { TasksStateType, TodolistType } from '../App'
import { addTodoListAC, todoListsReducer } from './todoListsReducer'
import { tasksReducer } from './tasksReducer'

test('ids should be equals', () => {
	const startTasksState: TasksStateType = {}
	const startTodolistsState: Array<TodolistType> = []

	const action = addTodoListAC('new todolist')

	const endTasksState = tasksReducer(startTasksState, action)
	const endTodolistsState = todoListsReducer(startTodolistsState, action)

	const keys = Object.keys(endTasksState)
	const idFromTasks = keys[0]
	const idFromTodolists = endTodolistsState[0].id

	expect(idFromTasks).toBe(action.todoListId)
	expect(idFromTodolists).toBe(action.todoListId)
})
