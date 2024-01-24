import { AppRootStateType } from 'app/reducers/store'

export const selectTasks = (state: AppRootStateType) => state.tasks
