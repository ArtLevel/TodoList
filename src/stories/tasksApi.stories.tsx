import React, {useEffect, useState} from 'react'
import {todoListsAPI} from '../api/todoListsAPI';

export default {
	title: 'API/TASKS'
}

export const GetTask = () => {
	const [state, setState] = useState<any>(null)
	useEffect(() => {
		const todoListId = '3ec8a43b-78fc-4227-a9e9-8bfbf1a5b90a'
		todoListsAPI.getTasks(todoListId).then(res => {
			setState(res.data)
		})
	}, [])

	return <div>{JSON.stringify(state)}</div>
}
export const CreateTasks = () => {
	const [state, setState] = useState<any>(null)
	useEffect(() => {
		const todoListId = '3ec8a43b-78fc-4227-a9e9-8bfbf1a5b90a'
		todoListsAPI.createTask(todoListId)
			.then(res => {
				setState(res.data)
			})
	}, [])

	return <div>{JSON.stringify(state)}</div>
}
export const DeleteTasks = () => {
	const [state, setState] = useState<any>(null)
	useEffect(() => {
		const todoListId = '3ec8a43b-78fc-4227-a9e9-8bfbf1a5b90a'
		const taskId = '256c31d1-9007-49fb-9a94-93211997f3be'
		todoListsAPI.deleteTask(todoListId, taskId)
			.then(res => {
				setState(res.data)
			})
	}, [])

	return <div>{JSON.stringify(state)}</div>
}
export const UpdateTasksTitle = () => {
	const [state, setState] = useState<any>(null)
	useEffect(() => {
		const todoListId = '3ec8a43b-78fc-4227-a9e9-8bfbf1a5b90a'
		const taskId = '096b1a5d-d833-4a4e-97cc-d546e8be6e41'
		todoListsAPI.updateTask(todoListId, taskId)
			.then(res => {
				setState(res.data)
			})
	}, [])

	return <div>{JSON.stringify(state)}</div>
}
