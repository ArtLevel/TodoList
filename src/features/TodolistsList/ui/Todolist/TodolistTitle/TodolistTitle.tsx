import { EditableSpan } from "common/components";
import { IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import React from "react";
import { useActions } from "common/hooks";
import { TodolistDomainType, todolistsThunks } from "features/TodolistsList/model/todolists/todolists.reducer";

type Props = {
  todolist: TodolistDomainType;
};

export const TodolistTitle = ({ todolist }: Props) => {
  const { id, title, entityStatus } = todolist;

  const { removeTodolist, changeTodolistTitle } = useActions(todolistsThunks);

  const removeTodolistHandler = () => {
    removeTodolist(id);
  };

  const changeTodolistTitleHandler = (title: string) => {
    changeTodolistTitle({ id, title });
  };

  return (
    <h3>
      <EditableSpan value={title} onChange={changeTodolistTitleHandler} />
      <IconButton onClick={removeTodolistHandler} disabled={entityStatus === "loading"}>
        <Delete />
      </IconButton>
    </h3>
  );
};
