import { AppRootStateType } from '../store'
import { TasksStateType } from '../../App'

export const tasksSelector = (state: AppRootStateType): TasksStateType => state.tasks