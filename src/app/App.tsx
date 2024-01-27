import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { CircularProgress } from '@mui/material'
import { ErrorSnackbar } from 'common/components'
import { useActions } from 'common/hooks'
import { selectIsInitialized } from 'app/app.selectors'
import { authThunks } from 'features/auth/model/auth.slice'
import { Routing } from 'app/ui/Routing'
import { Header } from 'app/ui/Header'

function App() {
	const isInitialized = useSelector(selectIsInitialized)

	const { initializeApp, logout } = useActions(authThunks)

	useEffect(() => {
		initializeApp()
	}, [])

	if (!isInitialized) {
		return (
			<div
				style={{
					position: 'fixed',
					top: '30%',
					textAlign: 'center',
					width: '100%'
				}}
			>
				<CircularProgress />
			</div>
		)
	}

	return (
		<BrowserRouter>
			<div className='App'>
				<ErrorSnackbar />

				<Header />

				<Routing />
			</div>
		</BrowserRouter>
	)
}

export default App
