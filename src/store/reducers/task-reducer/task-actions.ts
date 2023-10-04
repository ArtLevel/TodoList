import {AddNewTodoType, RemoveTodoType} from "../todos-reducer/todo-actions";

export type RemoveTaskType = ReturnType<typeof removeTaskAC>
export type AddNewTaskType = ReturnType<typeof addNewTaskAC>
export type ChangeTaskTitleType = ReturnType<typeof changeTaskTitleAC>
export type ChangeTaskStatusType = ReturnType<typeof changeTaskStatusAC>
export type TaskActionType = AddNewTodoType | RemoveTodoType |
    RemoveTaskType | AddNewTaskType | ChangeTaskTitleType | ChangeTaskStatusType
export const removeTaskAC = (todoId:string,taskId:string) => ({type:"REMOVE-TASK",todoId,taskId} as const)
export const addNewTaskAC = (todoId:string,title:string) => ({type:"ADD-NEW-TASK",todoId,title} as const)
export const changeTaskTitleAC = (todoId:string,taskId:string,title:string) => (
    {type:"CHANGE-TASK-TITLE",todoId,taskId,title} as const
)
export const changeTaskStatusAC = (todoId:string,taskId:string,isDone:boolean) => (
    {type:"CHANGE-TASK-STATUS",todoId,taskId,isDone} as const
)
