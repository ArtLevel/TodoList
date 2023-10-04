import {v1} from "uuid";
import {TodoListType} from "../../../types/todos-types";
import {TodoActionType} from "./todo-actions";


const initialState: TodoListType[] = []

export const todoReducer = (state: TodoListType[] = initialState, action: TodoActionType): TodoListType[] => {
    switch (action.type) {
        case "REMOVE-TODO":
            return state.filter(t => t.id !== action.todoId)
        case "ADD-NEW-TODO":
            const newTodo: TodoListType = {id: action.todoId, title: action.title, filter: "all"}
            return [...state, newTodo]
        case "CHANGE-TODO-TITLE":
            return state.map(t => t.id === action.todoId ? {...t, title: action.title} : t)
        case "CHANGE-TODO-FILTER":
            return state.map(t => t.id === action.todoId ? {...t, filter: action.filter} : t)
        default:
            return state
    }
}