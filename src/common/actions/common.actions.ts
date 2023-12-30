import { createAction } from '@reduxjs/toolkit'
import { TasksStateType } from '../../features/TodolistsList/tasks-reducer'
import { TodolistDomainType } from '../../features/TodolistsList/todolists-reducer'

export type ClearTasksAndTodolistsT = {
	tasks: TasksStateType,
	todolists: TodolistDomainType[]
}

export const clearTasksAndTodolists = createAction<ClearTasksAndTodolistsT>('common/clear-tasks-todolists')
// , (tasks: TasksStateType, todolists: TodolistDomainType[]) => {
// 	return {
// 		payload: {
// 			tasks,
// 			todolists
// 		}
// 	}
// }

