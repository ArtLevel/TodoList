import { AppRootStateType } from 'app/model/store'

export const selectTodolists = (state: AppRootStateType) => state.todolists
