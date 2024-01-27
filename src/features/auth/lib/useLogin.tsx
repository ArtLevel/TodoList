import { useActions, useAppDispatch } from 'common/hooks'
import { authThunks } from 'features/auth/model/authSlice'
import { useSelector } from 'react-redux'
import { selectCaptcha, selectIsLoggedIn } from '../model/auth.selectors'
import { FormikHelpers, useFormik } from 'formik'
import { LoginParamsType } from '../api/auth.api'
import { BaseResponseType } from 'common/types'

type FormikErrorType = Partial<LoginParamsType>

export const useLogin = () => {
	const { login } = useActions(authThunks)
	const captchaUrl = useSelector(selectCaptcha)
	const isLoggedIn = useSelector(selectIsLoggedIn)

	const dispatch = useAppDispatch()

	const formik = useFormik({
		validate: (values) => {
			const errors: FormikErrorType = {}
			if (!values.email) {
				errors.email = 'Email is required'
			} else if (
				!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
			) {
				errors.email = 'Invalid email address'
			}

			// if (formik.errors.captcha) {
			// 	errors.captcha = 'Incorrect anti-bot symbols'
			// }

			if (!values.password) {
				errors.password = 'Required'
			} else if (values.password.length < 3) {
				errors.password = 'Must be 3 characters or more'
			}

			return errors
		},
		initialValues: {
			email: '',
			password: '',
			rememberMe: false,
			captcha: ''
		},
		onSubmit: (values, formikHelpers: FormikHelpers<LoginParamsType>) => {
			login(values)
				.unwrap()
				.catch((reason: BaseResponseType) => {
					reason.fieldsErrors?.forEach((fieldError) => {
						if (fieldError.field === 'captcha') {
							dispatch(authThunks.captcha())
						}
						formikHelpers.setFieldError(fieldError.field, fieldError.error)
					})
				})
		}
	})

	return { formik, isLoggedIn, captchaUrl }
}
