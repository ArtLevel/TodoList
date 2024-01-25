import React, { ChangeEvent, memo } from "react";
import { Checkbox, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";

import { EditableSpan } from "common/components";
import { TaskStatuses } from "common/enums";
import { TaskType } from "features/TodolistsList/api/tasks/tasksApi.types";
import { useActions } from "common/hooks";
import { tasksThunks } from "features/TodolistsList/model/tasks/tasksSlice";
import s from "features/TodolistsList/ui/Todolist/Tasks/Task/Task.module.css";

type Props = {
  task: TaskType;
  todolistId: string;
};

export const Task = memo(({ task, todolistId }: Props) => {
  const { removeTask, updateTask } = useActions(tasksThunks);

  const removeTaskHandler = () => {
    removeTask({ taskId: task.id, todolistId });
  };

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New;
    updateTask({ taskId: task.id, domainModel: { status }, todolistId });
  };

  const changeTaskTitleHandler = (title: string) => {
    updateTask({ taskId: task.id, domainModel: { title }, todolistId });
  };

  return (
    <div key={task.id} className={task.status === TaskStatuses.Completed ? s.isDone : ""}>
      <Checkbox checked={task.status === TaskStatuses.Completed} color="primary" onChange={changeTaskStatusHandler} />

      <EditableSpan value={task.title} onChange={changeTaskTitleHandler} />
      <IconButton onClick={removeTaskHandler}>
        <Delete />
      </IconButton>
    </div>
  );
});
