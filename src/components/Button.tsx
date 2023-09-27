import React, { memo, ReactNode } from 'react'
import { Button } from '@mui/material'
import { FilterValuesType } from '../AppWithRedux'

interface IButton {
	filter: FilterValuesType
	activeFilter: FilterValuesType
	callback: (filter: FilterValuesType) => void
	children: ReactNode
}

export const OurButton = memo(({ filter, callback, children, activeFilter }: IButton) => {
	const onClickHandler = () => callback(filter)

	return <Button variant={filter === activeFilter ? 'outlined' : 'text'}
	               onClick={onClickHandler}
	               color={filter === 'all' ? 'inherit' : filter === 'completed' ? 'success' : filter === 'active' ? 'secondary' : 'inherit'}
	>{children}</Button>
})