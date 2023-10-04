import {v1} from "uuid";
import {FilterType} from "../../../types/todos-types";

export type RemoveTodoType = ReturnType<typeof removeTodoAC>
export type AddNewTodoType = ReturnType<typeof addNewTodoAC>
export type ChangeTodoTitleType = ReturnType<typeof changeTodoTitleAC>
export type ChangeTodoFilterType = ReturnType<typeof changeTodoFilterAC>
export type TodoActionType = RemoveTodoType | AddNewTodoType | ChangeTodoTitleType | ChangeTodoFilterType

export const removeTodoAC = (todoId:string) => ({type:"REMOVE-TODO",todoId} as const)
export const addNewTodoAC = (title:string) => ({type:"ADD-NEW-TODO",title,todoId:v1()} as const)
export const changeTodoTitleAC = (todoId:string,title:string) => (
    {type:"CHANGE-TODO-TITLE",title,todoId} as const
)
export const changeTodoFilterAC = (todoId:string,filter:FilterType) => (
    {type:"CHANGE-TODO-FILTER",filter,todoId} as const
)