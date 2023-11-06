import React, {useState} from 'react'
import {todoListsAPI} from '../api/todoListsAPI';

export default {
	title: 'API/TASKS'
}

export const GetTask = () => {
	const [state, setState] = useState<any>(null)
	const [todoListId, setTodoListId] = useState<string>('')

	const getTasksHandler = () => {
		todoListsAPI.getTasks(todoListId)
			.then(res => {
				setState(res.data)
			})
	}

	return <div>
		<div>{JSON.stringify(state)}</div>
		<div>
			<input placeholder='todoListId' value={todoListId} onChange={(e) => setTodoListId(e.currentTarget.value)}/>
			<button onClick={getTasksHandler}>Get Tasks</button>
		</div>
	</div>
}
export const CreateTasks = () => {
	const [state, setState] = useState<any>(null)
	const [todoListId, setTodoListId] = useState<string>('')
	const [taskTitle, setTaskTitle] = useState<string>('')


	const createTaskHandler = () => {
		todoListsAPI.createTask(todoListId, taskTitle)
			.then(res => {
				setState(res.data)
			})
	}

	return <div>
		<div>{JSON.stringify(state)}</div>
		<div>
			<input placeholder='todoListId' value={todoListId} onChange={(e) => setTodoListId(e.currentTarget.value)}/>
			<input placeholder='taskTitle' value={taskTitle} onChange={(e) => setTaskTitle(e.currentTarget.value)}/>
			<button onClick={createTaskHandler}>Create Task</button>
		</div>
	</div>
}
export const DeleteTasks = () => {
	const [state, setState] = useState<any>(null)
	const [todoListId, setTodoListId] = useState<string>('')
	const [taskId, setTaskId] = useState<string>('')

	const deleteTaskHandler = () => {
		todoListsAPI.deleteTask(todoListId, taskId)
			.then(res => {
				setState(res.data)
			})
	}

	return <div>
		<div>{JSON.stringify(state)}</div>
		<div>
			<input placeholder='todoListId' value={todoListId} onChange={(e) => setTodoListId(e.currentTarget.value)}/>
			<input placeholder='taskId' value={taskId} onChange={(e) => setTaskId(e.currentTarget.value)}/>
			<button onClick={deleteTaskHandler}>Delete Task</button>
		</div>
	</div>
}
export const UpdateTasks = () => {
	const [state, setState] = useState<any>(null)
	const [todoListId, setTodoListId] = useState('')
	const [taskId, setTaskId] = useState('')
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [status, setStatus] = useState(0)
	const [priority, setPriority] = useState(0)
	const [startDate, setStartDate] = useState('')
	const [deadline, setDeadline] = useState('')

	const updateTaskHandler = () => {
		todoListsAPI.updateTask(todoListId, taskId, {title, startDate, priority, deadline, status, description})
			.then(res => {
				setState(res.data)
			})
	}

	return <div>
		<div>{JSON.stringify(state)}</div>
		<div>
			<input placeholder='todoListId' value={todoListId} onChange={(e) => setTodoListId(e.currentTarget.value)}/>
			<input placeholder='taskId' value={taskId} onChange={(e) => setTaskId(e.currentTarget.value)}/>
			<input placeholder='title' value={title} onChange={(e) => setTitle(e.currentTarget.value)}/>
			<input placeholder='description' value={description} onChange={(e) => setDescription(e.currentTarget.value)}/>
			<input placeholder='status' value={status} onChange={(e) => setStatus(Number(e.currentTarget.value))}/>
			<input placeholder='priority' value={priority} onChange={(e) => setPriority(Number(e.currentTarget.value))}/>
			<input placeholder='startDate' value={startDate} onChange={(e) => setStartDate(e.currentTarget.value)}/>
			<input placeholder='deadline' value={deadline} onChange={(e) => setDeadline(e.currentTarget.value)}/>
			<button onClick={updateTaskHandler}>Update Task</button>
		</div>
	</div>
}
