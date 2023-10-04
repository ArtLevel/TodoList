export type TaskType = {
    id:string
    title:string
    isDone:boolean
}

export type TaskStateType = {
    [key:string]: TaskType[]
}
