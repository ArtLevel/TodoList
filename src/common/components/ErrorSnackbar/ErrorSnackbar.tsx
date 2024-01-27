import React from 'react'
import { useSelector } from 'react-redux'
import { AlertProps, Snackbar } from '@mui/material'
import MuiAlert from '@mui/material/Alert'
import { appActions } from 'app/model/appSlice'
import { selectAppError } from 'app/model/app.selectors'
import { useActions } from 'common/hooks'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
	function Alert(props, ref) {
		return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
	}
)

export function ErrorSnackbar() {
	const error = useSelector(selectAppError)
	const { setAppError } = useActions(appActions)

	const handleClose = (
		event?: React.SyntheticEvent | Event,
		reason?: string
	) => {
		if (reason === 'clickaway') {
			return
		}
		setAppError({ error: null })
	}

	const isOpen = error !== null

	return (
		<Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
			<Alert onClose={handleClose} severity='error'>
				{error}
			</Alert>
		</Snackbar>
	)
}
