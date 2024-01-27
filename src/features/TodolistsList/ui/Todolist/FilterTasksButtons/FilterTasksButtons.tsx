import { Button } from '@mui/material'
import React from 'react'
import { useActions } from 'common/hooks'
import {
	FilterValuesType,
	TodolistDomainType,
	todolistsActions
} from 'features/TodolistsList/model/todolists/todolistsSlice'

type Props = {
	todolist: TodolistDomainType
}

export const FilterTasksButtons = ({ todolist }: Props) => {
	const { id, filter } = todolist

	const { changeTodolistFilter } = useActions(todolistsActions)

	const changeFilterHandler = (filter: FilterValuesType) => {
		changeTodolistFilter({ filter, id })
	}

	return (
		<div style={{ paddingTop: '10px' }}>
			<Button
				variant={filter === 'all' ? 'outlined' : 'text'}
				onClick={() => changeFilterHandler('all')}
				color={'inherit'}
			>
				All
			</Button>
			<Button
				variant={filter === 'active' ? 'outlined' : 'text'}
				onClick={() => changeFilterHandler('active')}
				color={'primary'}
			>
				Active
			</Button>
			<Button
				variant={filter === 'completed' ? 'outlined' : 'text'}
				onClick={() => changeFilterHandler('completed')}
				color={'secondary'}
			>
				Completed
			</Button>
		</div>
	)
}
