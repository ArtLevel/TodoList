import { AppRootStateType } from '../store'
import { TodolistType } from '../../App'

export const todolistsSelector = (state: AppRootStateType): TodolistType[] => state.todolists