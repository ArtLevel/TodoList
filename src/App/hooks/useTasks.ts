import { useState } from 'react'
import { todolistId1, todolistId2 } from '../idUtils'
import { v1 } from 'uuid'
import { TasksStateType } from '../App'

export function useTasks() {
	let [tasks, setTasks] = useState<TasksStateType>({
		[todolistId1]: [
			{ id: v1(), title: 'HTML&CSS', isDone: true },
			{ id: v1(), title: 'JS', isDone: true }
		],
		[todolistId2]: [
			{ id: v1(), title: 'Milk', isDone: true },
			{ id: v1(), title: 'React Book', isDone: true }
		]
	})

	function removeTask(id: string, todolistId: string) {
		//достанем нужный массив по todolistId:
		let todolistTasks = tasks[todolistId]
		// перезапишем в этом объекте массив для нужного тудулиста отфилтрованным массивом:
		tasks[todolistId] = todolistTasks.filter((t) => t.id != id)
		// засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
		setTasks({ ...tasks })
	}

	function addTask(title: string, todolistId: string) {
		let task = { id: v1(), title: title, isDone: false }
		//достанем нужный массив по todolistId:
		let todolistTasks = tasks[todolistId]
		// перезапишем в этом объекте массив для нужного тудулиста копией, добавив в начало новую таску:
		tasks[todolistId] = [task, ...todolistTasks]
		// засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
		setTasks({ ...tasks })
	}

	function changeStatus(id: string, isDone: boolean, todolistId: string) {
		//достанем нужный массив по todolistId:
		let todolistTasks = tasks[todolistId]
		// найдём нужную таску:
		let task = todolistTasks.find((t) => t.id === id)
		//изменим таску, если она нашлась
		if (task) {
			task.isDone = isDone
			// засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
			setTasks({ ...tasks })
		}
	}

	function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
		//достанем нужный массив по todolistId:
		let todolistTasks = tasks[todolistId]
		// найдём нужную таску:
		let task = todolistTasks.find((t) => t.id === id)
		//изменим таску, если она нашлась
		if (task) {
			task.title = newTitle
			// засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
			setTasks({ ...tasks })
		}
	}

	function completelyRemoveTasksForTodoList(id: string) {
		delete tasks[id]
		setTasks({ ...tasks })
	}

	function addStateForNewTodoList(newTodolistId: string) {
		setTasks({
			...tasks,
			[newTodolistId]: []
		})
	}

	return {
		tasks,
		setTasks,
		removeTask,
		addTask,
		changeStatus,
		changeTaskTitle,
		completelyRemoveTasksForTodoList,
		addStateForNewTodoList
	}
}
