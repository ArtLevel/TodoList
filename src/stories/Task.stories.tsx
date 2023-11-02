import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { action } from '@storybook/addon-actions'
import { Task } from '../Task'

// More on how to set up stories at:
// https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Task> = {
	title: 'TODOLISTS/Task',
	component: Task,
	// This component will have an automatically generated Autodocs entry:
	// https://storybook.js.org/docs/react/writing-docs/autodocs
	tags: ['autodocs'],
	// More on argTypes:
	// https://storybook.js.org/docs/react/api/argtypes
	args: {
		changeTaskStatus: action('Change Task Status'),
		changeTaskTitle: action('Change Task Title'),
		removeTask: action('Remove Task'),
		task: { id: '123', title: 'JS', isDone: false },
		todolistId: 'sdjflkjasdfjklsadfj1234jkj12345lkjgajhj12jh12j3k4hjkhjkfdha'
	}
}

export default meta
type Story = StoryObj<typeof Task>

// More on component templates:
// https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const TaskIsDoneFalseStory: Story = {
	args: {
		task: { id: '121323', title: 'JS', isDone: false }
	}
}

export const TaskIsDoneTrueStory: Story = {
	args: {
		task: { id: '123', title: 'React', isDone: true }
	}
}

const TaskToogle = () => {
	const [task, setTask] = useState({ id: '123', title: 'JS', isDone: true })

	return (
		<Task
			changeTaskStatus={() => setTask({ ...task, isDone: !task.isDone })}
			changeTaskTitle={(taskId, newTitle) =>
				setTask({ ...task, title: newTitle })
			}
			removeTask={action('Remove Task')}
			task={task}
			todolistId={'sadfsadfas645fdfsdasfd1233a'}
		/>
	)
}

export const TaskStory: Story = {
	render: () => <TaskToogle />
}
