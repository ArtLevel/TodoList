import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from './tasksReducer'
import { TasksStateType } from '../App'
import { addTodoListAC } from './todoListsReducer'

test('correct task should be deleted from correct array', () => {
	const startState: TasksStateType = {
		'todolistId1': [
			{ id: '1', title: 'CSS', isDone: false },
			{ id: '2', title: 'JS', isDone: true },
			{ id: '3', title: 'React', isDone: false }
		],
		'todolistId2': [
			{ id: '1', title: 'bread', isDone: false },
			{ id: '2', title: 'milk', isDone: true },
			{ id: '3', title: 'tea', isDone: false }
		]
	}

	const action = removeTaskAC('2', 'todolistId2')

	const endState = tasksReducer(startState, action)

	expect(endState).toEqual({
		'todolistId1': [
			{ id: '1', title: 'CSS', isDone: false },
			{ id: '2', title: 'JS', isDone: true },
			{ id: '3', title: 'React', isDone: false }
		],
		'todolistId2': [
			{ id: '1', title: 'bread', isDone: false },
			{ id: '3', title: 'tea', isDone: false }
		]
	})
})

test('correct task should be added to correct array', () => {
	const startState: TasksStateType = {
		'todolistId1': [
			{ id: '1', title: 'CSS', isDone: false },
			{ id: '2', title: 'JS', isDone: true },
			{ id: '3', title: 'React', isDone: false }
		],
		'todolistId2': [
			{ id: '1', title: 'bread', isDone: false },
			{ id: '2', title: 'milk', isDone: true },
			{ id: '3', title: 'tea', isDone: false }
		]
	}

	const action = addTaskAC('juce', 'todolistId2')

	const endState = tasksReducer(startState, action)

	expect(endState['todolistId1'].length).toBe(3)
	expect(endState['todolistId2'].length).toBe(4)
	expect(endState['todolistId2'][0].id).toBeDefined()
	expect(endState['todolistId2'][0].title).toBe('juce')
	expect(endState['todolistId2'][0].isDone).toBe(false)
})

test('status of specified task should be changed', () => {
	const startState: TasksStateType = {
		'todolistId1': [
			{ id: '1', title: 'CSS', isDone: false },
			{ id: '2', title: 'JS', isDone: true },
			{ id: '3', title: 'React', isDone: false }
		],
		'todolistId2': [
			{ id: '1', title: 'bread', isDone: false },
			{ id: '2', title: 'milk', isDone: true },
			{ id: '3', title: 'tea', isDone: false }
		]
	}

	const action = changeTaskStatusAC('2', false, 'todolistId2')

	const endState = tasksReducer(startState, action)

	expect(endState['todolistId2'][1].isDone).toBe(false)
	expect(endState['todolistId1'][1].isDone).toBe(true)
})

test('change task title', () => {
	const startState: TasksStateType = {
		'todolistId1': [
			{ id: '1', title: 'CSS', isDone: false },
			{ id: '2', title: 'JS', isDone: true },
			{ id: '3', title: 'React', isDone: false }
		],
		'todolistId2': [
			{ id: '1', title: 'bread', isDone: false },
			{ id: '2', title: 'milk', isDone: true },
			{ id: '3', title: 'tea', isDone: false }
		]
	}

	const action = changeTaskTitleAC('3', 'tomato', 'todolistId2')

	const endState = tasksReducer(startState, action)

	expect(endState['todolistId2'][2].title).toBe('tomato')
	expect(endState['todolistId1'][2].title).toBe('React')
})

test('new property with new array should be added when new todolist is added', () => {
	const startState: TasksStateType = {
		'todolistId1': [
			{ id: '1', title: 'CSS', isDone: false },
			{ id: '2', title: 'JS', isDone: true },
			{ id: '3', title: 'React', isDone: false }
		],
		'todolistId2': [
			{ id: '1', title: 'bread', isDone: false },
			{ id: '2', title: 'milk', isDone: true },
			{ id: '3', title: 'tea', isDone: false }
		]
	}

	const action = addTodoListAC('new todolist')

	const endState = tasksReducer(startState, action)

	const keys = Object.keys(endState)
	const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
	if (!newKey) throw Error('new key should be added')

	expect(keys.length).toBe(3)
	expect(endState[newKey]).toEqual([])
})
