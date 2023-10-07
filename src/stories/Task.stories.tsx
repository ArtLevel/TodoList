import { action } from '@storybook/addon-actions'
import { Task } from '../Task'

export default {
	title: 'Task',
	component: Task
}

const changeTaskStatusCallback = action('Status changed')
const changeTaskTitleCallback = action('Task title changed')
const removeTaskCallback = action('Remove task')

export const TaskBaseExample = () => {
	return (
		<>
			<Task
				changeTaskStatus={changeTaskStatusCallback}
				changeTaskTitle={changeTaskTitleCallback}
				removeTask={removeTaskCallback}
				task={{ id: 'taskId1', isDone: true, title: 'React' }}
				todolistId={'todoListId1'}
			/>
			<Task
				changeTaskStatus={changeTaskStatusCallback}
				changeTaskTitle={changeTaskTitleCallback}
				removeTask={removeTaskCallback}
				task={{ id: 'taskId2', isDone: false, title: 'TS' }}
				todolistId={'todoListId2'}
			/>
		</>
	)
}
