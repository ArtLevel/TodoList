import { Dispatch } from 'redux'
import { appActions } from 'app/reducers/app.reducer'
import { BaseResponseType } from 'common/types/common.types'

/**
 * Обрабатывает ошибку, полученную от сервера
 *
 * @template D
 * @param {BaseResponseType<D>} data - данные типа BaseResponseType
 * @param {Dispatch} dispatch - функция dispatch для обновления состояния в Redux
 * @param {boolean} [showError=true] - флаг для отображения ошибки, по умолчанию установлен в true
 * @returns {void}
 */

export const handleServerAppError = <D>(
	data: BaseResponseType<D>,
	dispatch: Dispatch,
	showError: boolean = true
): void => {
	if (showError) {
		if (data.messages.length) {
			dispatch(appActions.setAppError({ error: data.messages[0] }))
		} else {
			dispatch(appActions.setAppError({ error: 'Some error occurred' }))
		}
	}
	dispatch(appActions.setAppStatus({ status: 'failed' }))
}
