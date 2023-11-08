import { useState } from 'react'
import { todolistId1, todolistId2 } from '../idUtils'
import { FilterValuesType, TodolistType } from '../App'
import { v1 } from 'uuid'

export function useTodoLists(
	onTodoListRemoved: (id: string) => void,
	onTodoListAdded: (id: string) => void
) {
	let [todolists, setTodolists] = useState<Array<TodolistType>>([
		{ id: todolistId1, title: 'What to learn', filter: 'all' },
		{ id: todolistId2, title: 'What to buy', filter: 'all' }
	])

	function changeFilter(value: FilterValuesType, todolistId: string) {
		let todolist = todolists.find((tl) => tl.id === todolistId)
		if (todolist) {
			todolist.filter = value
			setTodolists([...todolists])
		}
	}

	function removeTodolist(id: string) {
		// засунем в стейт список тудулистов, id которых не равны тому, который нужно выкинуть
		setTodolists(todolists.filter((tl) => tl.id != id))
		// удалим таски для этого тудулиста из второго стейта, где мы храним отдельно таски
		onTodoListRemoved(id)
	}

	function changeTodolistTitle(id: string, title: string) {
		// найдём нужный todolist
		const todolist = todolists.find((tl) => tl.id === id)
		if (todolist) {
			// если нашёлся - изменим ему заголовок
			todolist.title = title
			setTodolists([...todolists])
		}
	}

	function addTodolist(title: string) {
		let newTodolistId = v1()
		let newTodolist: TodolistType = {
			id: newTodolistId,
			title: title,
			filter: 'all'
		}
		setTodolists([newTodolist, ...todolists])
		onTodoListAdded(newTodolistId)
	}

	return {
		todolists,
		changeFilter,
		removeTodolist,
		changeTodolistTitle,
		addTodolist
	}
}
