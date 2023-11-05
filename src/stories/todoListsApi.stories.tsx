import React, {useEffect, useState} from 'react'
import axios from 'axios';

export default {
	title: 'API'
}

const settings = {
	withCredentials: true,
	headers: {
		'API-KEY': '6c25a8cb-5b12-4a93-b382-f9ada76279f8'
	}
}

export const GetTodolists = () => {
	const [state, setState] = useState<any>(null)
	useEffect(() => {
		axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
			.then(res => {
				setState(res.data)
			})

	}, [])

	return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
	const [state, setState] = useState<any>(null)
	useEffect(() => {
		axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', {title: 'What is it ?'}, settings)
			.then(res => {
				setState(res.data)
			})
	}, [])

	return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
	const [state, setState] = useState<any>(null)
	useEffect(() => {
		axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/d3fe62f4-f291-4ed2-94f2-bc5ebbffc44c`, settings)
			.then(res => {
				setState(res.data)
			})
	}, [])

	return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
	const [state, setState] = useState<any>(null)
	useEffect(() => {
		axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/e38a8616-995f-43dd-9a46-1061b58276b4`, {title: 'HI !'}, settings)
			.then(res => {
				setState(res.data)
			})
	}, [])

	return <div>{JSON.stringify(state)}</div>
}
