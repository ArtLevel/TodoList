import { AppRootStateType } from '../store'
import { TodolistType } from '../../AppWithRedux'

export const todolistsSelector = (state: AppRootStateType): TodolistType[] => state.todolists