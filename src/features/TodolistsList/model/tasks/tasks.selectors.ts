import { AppRootStateType } from 'app/model/store'

export const selectTasks = (state: AppRootStateType) => state.tasks
