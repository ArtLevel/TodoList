import React, {useEffect, useState} from 'react'
import {todoListsAPI} from '../api/todoListsAPI';

export default {
	title: 'API'
}

export const GetTodolists = () => {
	const [state, setState] = useState<any>(null)
	useEffect(() => {
		todoListsAPI.getTodoLists().then(res => {
			setState(res.data)
		})
	}, [])

	return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
	const [state, setState] = useState<any>(null)
	useEffect(() => {
		todoListsAPI.postCreateTodoList()
			.then(res => {
				setState(res.data)
			})
	}, [])

	return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
	const [state, setState] = useState<any>(null)
	useEffect(() => {
		const todoListId = 'd3fe62f4-f291-4ed2-94f2-bc5ebbffc44c'
		todoListsAPI.deleteTodoList(todoListId)
			.then(res => {
				setState(res.data)
			})
	}, [])

	return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
	const [state, setState] = useState<any>(null)
	useEffect(() => {
		const todoListId = 'e38a8616-995f-43dd-9a46-1061b58276b4'
		todoListsAPI.updateTodoList(todoListId)
			.then(res => {
				setState(res.data)
			})
	}, [])

	return <div>{JSON.stringify(state)}</div>
}
