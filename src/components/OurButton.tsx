import React, { ButtonHTMLAttributes, memo, ReactNode } from 'react'
import { Button } from '@mui/material'
import { FilterValuesType } from '../AppWithRedux'

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
	filter: FilterValuesType
	activeFilter: FilterValuesType
	children: ReactNode
}

export const OurButton = memo(({ filter, children, activeFilter, ...restProps }: IButton) => {
	const { onClick } = restProps

	return <Button variant={filter === activeFilter ? 'outlined' : 'text'}
	               color={filter === 'all' ? 'inherit' : filter === 'completed' ? 'success' : filter === 'active' ? 'secondary' : 'inherit'}
	               onClick={onClick}
	>{children}</Button>
})