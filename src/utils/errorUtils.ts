import { setAppErrorAC, SetAppErrorAT, setAppStatusAC, SetAppStatusAT } from '../app/app-reducer'
import { ResponseType } from '../api/todolists-api'
import { Dispatch } from 'redux'

export const handleServerAppError = <T>(dispatch: Dispatch<DispatchErrorT>, data: ResponseType<T>) => {
	if (data.messages.length) {
		dispatch(setAppErrorAC(data.messages[0]))
	} else {
		dispatch(setAppErrorAC('Some Error'))
	}
	dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkError = (dispatch: Dispatch<DispatchErrorT>, e: { message: string }) => {
	dispatch(setAppErrorAC(e.message))
	dispatch(setAppStatusAC('failed'))
}

type DispatchErrorT = SetAppErrorAT | SetAppStatusAT
