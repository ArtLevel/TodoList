import React, { useEffect } from 'react'
import { TodolistDomainType } from 'features/TodolistsList/model/todolists/todolistsSlice'
import { tasksThunks } from 'features/TodolistsList/model/tasks/tasksSlice'
import { useActions } from 'common/hooks'
import { AddItemForm } from 'common/components'
import { TaskType } from 'features/TodolistsList/api/tasks/tasksApi.types'
import { Tasks } from 'features/TodolistsList/ui/Todolist/Tasks/Tasks'
import { TodolistTitle } from '../Todolist/TodolistTitle/TodolistTitle'
import { FilterTasksButtons } from '../Todolist/FilterTasksButtons/FilterTasksButtons'

type Props = {
	todolist: TodolistDomainType
	tasks: TaskType[]
}

export const Todolist = React.memo(function ({ todolist, tasks }: Props) {
	const { fetchTasks, addTask } = useActions(tasksThunks)

	useEffect(() => {
		fetchTasks(todolist.id)
	}, [])

	const addTaskCb = (title: string) => {
		return addTask({ title, todolistId: todolist.id }).unwrap()
	}

	return (
		<div>
			<TodolistTitle todolist={todolist} />
			<AddItemForm
				addItem={addTaskCb}
				disabled={todolist.entityStatus === 'loading'}
			/>
			<Tasks tasks={tasks} todolist={todolist} />
			<FilterTasksButtons todolist={todolist} />
		</div>
	)
})
