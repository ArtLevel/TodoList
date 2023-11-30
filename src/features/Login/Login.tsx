import React from 'react'
import Grid from '@mui/material/Grid'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useFormik } from 'formik'
import { useAppDispatch, useAppSelector } from '../../app/store'
import { loginTC } from './auth-reducer'
import { Navigate } from 'react-router-dom'

type FormikErrorT = {
	email?: string
	password?: string
}

export type LoginT = {
	email: string
	password: string
	rememberMe: boolean
}

export const Login = () => {
	const dispatch = useAppDispatch()

	const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
			rememberMe: false
		},
		onSubmit: (values: LoginT) => {
			dispatch(loginTC(values))
			formik.resetForm()
		},
		validate: (values: LoginT) => {
			const errors: FormikErrorT = {}

			if (!values.email) {
				errors.email = 'Required'
			} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
				errors.email = 'Invalid email address'
			}

			if (!values.password) {
				errors.password = 'Required'
			}

			return errors
		}
	})

	if (isLoggedIn) {
		return <Navigate to={'/'} />
	}

	return <Grid container justifyContent={'center'}>
		<Grid item justifyContent={'center'}>
			<FormControl>
				<form onSubmit={formik.handleSubmit}>
					<FormGroup>
						<TextField label='Email' margin='normal' {...formik.getFieldProps('email')} />
						{formik.touched.email && formik.errors.email && <div style={{ color: 'red' }}>{formik.errors.email}</div>}
						<TextField type='password' label='Password'
											 {...formik.getFieldProps('password')}
											 margin='normal'
						/>
						{formik.touched.password && formik.errors.password &&
							<div style={{ color: 'red' }}>{formik.errors.password}</div>}
						<FormControlLabel label='Remember me' control={<Checkbox />}
															checked={formik.values.rememberMe}
															{...formik.getFieldProps('rememberMe')}
						/>
						<Button type='submit' variant='contained' color='primary'>
							Login
						</Button>
					</FormGroup>
				</form>
			</FormControl>
		</Grid>
	</Grid>
}
