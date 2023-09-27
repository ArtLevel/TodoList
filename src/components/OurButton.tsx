import React, { ButtonHTMLAttributes, memo } from 'react'
import { Button } from '@mui/material'
import { FilterValuesType } from '../AppWithRedux'

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant: 'outlined' | 'text'
	filter: FilterValuesType
}

export const OurButton = memo(({ filter, variant, ...restProps }: IButton) => {
	const { onClick, children } = restProps

	return <Button variant={variant}
	               color={filter === 'all' ? 'inherit' : filter === 'completed' ? 'success' : filter === 'active' ? 'secondary' : 'inherit'}
	               onClick={onClick}
	>{children}</Button>
})
