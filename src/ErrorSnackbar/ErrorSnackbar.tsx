import * as React from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import { useAppDispatch, useAppSelector } from '../state/store'
import { setErrorAC } from '../state/app-reducer'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
	props,
	ref
) {
	return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

export function CustomizedSnackbars() {
	const error = useAppSelector(state => state.app.error)
	const dispatch = useAppDispatch()

	const isOpen = error !== null

	const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
		if (reason === 'clickaway') {
			return
		}

		dispatch(setErrorAC(null))
	}

	return (
		<Snackbar open={isOpen} autoHideDuration={2000} onClose={handleClose}>
			<Alert onClose={handleClose} severity='error'>
				{error}
			</Alert>
		</Snackbar>
	)
}