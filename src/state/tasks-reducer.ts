import { TasksStateType } from '../App'
import { AddTodolistActionType, RemoveTodolistActionType, SetTodoListsActionType } from './todolists-reducer'
import { TaskStatuses, TaskType, todolistsAPI } from '../api/todolists-api'
import { Dispatch } from 'redux'

export type RemoveTaskActionType = {
	type: 'REMOVE-TASK'
	todolistId: string
	taskId: string
}

export type AddTaskActionType = {
	type: 'ADD-TASK'
	task: TaskType
}

export type ChangeTaskStatusActionType = {
	type: 'CHANGE-TASK-STATUS'
	todolistId: string
	taskId: string
	status: TaskStatuses
}

export type ChangeTaskTitleActionType = {
	type: 'CHANGE-TASK-TITLE'
	todolistId: string
	taskId: string
	title: string
}

export type SetTasksActionType = {
	type: 'SET-TASKS'
	tasks: TaskType[]
	todolistId: string
}

type ActionsType = RemoveTaskActionType | AddTaskActionType
	| ChangeTaskStatusActionType
	| ChangeTaskTitleActionType
	| AddTodolistActionType
	| RemoveTodolistActionType
	| SetTodoListsActionType
	| SetTasksActionType

const initialState: TasksStateType = {
	/*"todolistId1": [
			{ id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
					startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
			{ id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
					startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
			{ id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
					startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
	],
	"todolistId2": [
			{ id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
					startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
			{ id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '',
					startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
			{ id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
					startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
	]*/

}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
	switch (action.type) {
		case 'REMOVE-TASK': {
			const stateCopy = { ...state }
			const tasks = stateCopy[action.todolistId]
			const newTasks = tasks.filter(t => t.id !== action.taskId)
			stateCopy[action.todolistId] = newTasks
			return stateCopy
		}
		case 'ADD-TASK': {
			const stateCopy = { ...state }

			const newTask: TaskType = action.task

			const tasks = stateCopy[newTask.todoListId]

			const newTasks = [newTask, ...tasks]
			stateCopy[newTask.todoListId] = newTasks

			return stateCopy
		}
		case 'CHANGE-TASK-STATUS': {
			let todolistTasks = state[action.todolistId]
			let newTasksArray = todolistTasks
				.map(t => t.id === action.taskId ? { ...t, status: action.status } : t)

			state[action.todolistId] = newTasksArray
			return ({ ...state })
		}
		case 'CHANGE-TASK-TITLE': {
			let todolistTasks = state[action.todolistId]
			// найдём нужную таску:
			let newTasksArray = todolistTasks
				.map(t => t.id === action.taskId ? { ...t, title: action.title } : t)

			state[action.todolistId] = newTasksArray
			return ({ ...state })
		}
		case 'ADD-TODOLIST': {
			return {
				...state,
				[action.todolistId]: []
			}
		}
		case 'REMOVE-TODOLIST': {
			const copyState = { ...state }
			delete copyState[action.id]
			return copyState
		}
		case 'SET-TODOLISTS': {
			const copyState = { ...state }

			action.todolists.forEach(tl => {
				copyState[tl.id] = []
			})

			return copyState
		}
		case 'SET-TASKS': {
			return {
				...state,
				[action.todolistId]: action.tasks
			}
		}
		default:
			return state
	}
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
	return { type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId }
}
export const addTaskAC = (task: TaskType): AddTaskActionType => {
	return { type: 'ADD-TASK', task }
}
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string): ChangeTaskStatusActionType => {
	return { type: 'CHANGE-TASK-STATUS', status, todolistId, taskId }
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
	return { type: 'CHANGE-TASK-TITLE', title, todolistId, taskId }
}

export const setTasksAC = (tasks: TaskType[], todolistId: string): SetTasksActionType => ({
		type: 'SET-TASKS',
		todolistId,
		tasks
	}
)

export const fetchTasksTC = (todolistId: string) => {
	return (dispatch: Dispatch) => {
		todolistsAPI.getTasks(todolistId)
			.then(res => dispatch(setTasksAC(res.data.items, todolistId)))
	}
}

export const deleteTaskTC = (todolistId: string, taskId: string) => {
	return (dispatch: Dispatch) => {
		todolistsAPI.deleteTask(todolistId, taskId).then(res => {
			const action = removeTaskAC(taskId, todolistId)
			dispatch(action)
		})
	}
}

export const addTaskTC = (todolistId: string, title: string) => {
	return (dispatch: Dispatch) => {
		todolistsAPI.createTask(todolistId, title).then(res => {
			const action = addTaskAC(res.data.data.item)
			dispatch(action)
		})
	}
}
