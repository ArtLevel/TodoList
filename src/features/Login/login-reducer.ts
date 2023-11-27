import { authAPI, LoginParamsT, TaskType } from '../../api/todolists-api'
import { Dispatch } from 'redux'
import { SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType } from '../../app/app-reducer'
import { handleServerAppError, handleServerNetworkError } from '../../utils/error-utils'

const initialState: InitialStateType = {}

export const tasksReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
	switch (action.type) {

		default:
			return state
	}
}

// actions
// export const removeTaskAC = (taskId: string, todolistId: string) => ({type: 'REMOVE-TASK', taskId, todolistId} as const)

// thunks
export const loginTC = (data: LoginParamsT) => (dispatch: Dispatch<ActionsType | SetAppStatusActionType>) => {
	dispatch(setAppStatusAC('loading'))
	authAPI.login(data)
		.then(res => {
			if (res.data.resultCode === 0) {
				dispatch(setAppStatusAC('succeeded'))
			} else {
				handleServerAppError(res.data, dispatch)
			}
		})
		.catch(err => {
			handleServerNetworkError(err, dispatch)
		})
}

// types
export type TasksStateType = {
	[key: string]: Array<TaskType>
}
type ActionsType = any
type InitialStateType = {}
type ThunkDispatch = Dispatch<ActionsType | SetAppStatusActionType | SetAppErrorActionType>
