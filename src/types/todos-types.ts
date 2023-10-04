export type FilterType = "all" | "active" | "completed"

export type TodoListType = {
    id:string
    title:string
    filter: FilterType
}