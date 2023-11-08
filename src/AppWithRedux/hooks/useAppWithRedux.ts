import { useDispatch, useSelector } from 'react-redux'
import { AppRootStateType } from '../../state/store'
import { useCallback } from 'react'
import {
	addTaskAC,
	changeTaskStatusAC,
	changeTaskTitleAC,
	removeTaskAC
} from '../../state/tasks-reducer'
import {
	addTodolistAC,
	changeTodolistFilterAC,
	changeTodolistTitleAC,
	removeTodolistAC
} from '../../state/todolists-reducer'
import { FilterValuesType, TasksStateType, TodolistType } from '../AppWithRedux'

export const useAppWithRedux = () => {
	const todolists = useSelector<AppRootStateType, Array<TodolistType>>(
		(state) => state.todolists
	)
	const tasks = useSelector<AppRootStateType, TasksStateType>(
		(state) => state.tasks
	)
	const dispatch = useDispatch()

	const removeTask = useCallback(
		function (id: string, todolistId: string) {
			const action = removeTaskAC(id, todolistId)
			dispatch(action)
		},
		[dispatch]
	)

	const addTask = useCallback(
		function (title: string, todolistId: string) {
			const action = addTaskAC(title, todolistId)
			dispatch(action)
		},
		[dispatch]
	)

	const changeStatus = useCallback(
		function (id: string, isDone: boolean, todolistId: string) {
			const action = changeTaskStatusAC(id, isDone, todolistId)
			dispatch(action)
		},
		[dispatch]
	)

	const changeTaskTitle = useCallback(
		function (id: string, newTitle: string, todolistId: string) {
			const action = changeTaskTitleAC(id, newTitle, todolistId)
			dispatch(action)
		},
		[dispatch]
	)

	const changeFilter = useCallback(
		function (value: FilterValuesType, todolistId: string) {
			const action = changeTodolistFilterAC(todolistId, value)
			dispatch(action)
		},
		[dispatch]
	)

	const removeTodolist = useCallback(
		function (id: string) {
			const action = removeTodolistAC(id)
			dispatch(action)
		},
		[dispatch]
	)

	const changeTodolistTitle = useCallback(
		(id: string, title: string) => {
			const action = changeTodolistTitleAC(id, title)
			dispatch(action)
		},
		[dispatch]
	)

	const addTodolist = useCallback(
		(title: string) => {
			const action = addTodolistAC(title)
			dispatch(action)
		},
		[dispatch]
	)

	return {
		todolists,
		tasks,
		removeTask,
		addTodolist,
		changeTodolistTitle,
		removeTodolist,
		changeFilter,
		changeTaskTitle,
		addTask,
		changeStatus
	}
}
