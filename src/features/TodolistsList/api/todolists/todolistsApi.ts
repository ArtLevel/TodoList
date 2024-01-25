import { instance } from "common/api/common.api";
import { BaseResponseType } from "common/types";

export const todolistsApi = {
  getTodolists() {
    return instance.get<TodolistType[]>("todo-lists");
  },
  createTodolist(title: string) {
    return instance.post<BaseResponseType<{ item: TodolistType }>>("todo-lists", { title: title });
  },
  deleteTodolist(id: string) {
    return instance.delete<BaseResponseType>(`todo-lists/${id}`);
  },
  updateTodolist(arg: UpdateTodolistTitleArgType) {
    return instance.put<BaseResponseType>(`todo-lists/${arg.id}`, { title: arg.title });
  },
};

// Types
export type TodolistType = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
};

export type UpdateTodolistTitleArgType = {
  id: string;
  title: string;
};
