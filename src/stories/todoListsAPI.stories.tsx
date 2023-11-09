import React, { useEffect, useState } from 'react'
import { todoListAPI } from '../api/todoListAPI'

export default {
	title: 'API'
}

export const GetTodolists = () => {
	const [state, setState] = useState<any>(null)
	useEffect(() => {
		todoListAPI.getTodoLists().then((response) => setState(response.data))
	}, [])
	return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
	const [state, setState] = useState<any>(null)
	useEffect(() => {
		todoListAPI.createTodoList().then((response) => setState(response.data))
	}, [])

	return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
	const [state, setState] = useState<any>(null)
	useEffect(() => {
		const todoListId = '6eeb86d7-91dd-4cbc-9ada-3ba53a42a9f5'
		todoListAPI
			.deleteTodoList(todoListId)
			.then((response) => setState(response.data))
	}, [])

	return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
	const [state, setState] = useState<any>(null)
	useEffect(() => {
		const todoListId = 'f4911eaa-c91e-45d9-b7ec-2f8210f81be4'
		todoListAPI
			.updateTodoList(todoListId)
			.then((response) => setState(response.data))
	}, [])

	return <div>{JSON.stringify(state)}</div>
}
