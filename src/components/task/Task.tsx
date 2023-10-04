import {Box, Checkbox, ListItem} from "@mui/material";
import {TaskType} from "../../types/tasks-types";
import React, {FC, useCallback} from "react";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../../store/reducers/task-reducer/task-actions";
import {useAppDispatch} from "../../store/hooks";
import { EditableSpan } from "../EditableSpan/EditableSpan";


type PropsType = {
    tasks: TaskType
    todoId: string
    handleRemoveTask: (taskId:string) => void
    handleChangeStatus:(taskId:string,isDone:boolean) => void
    handleChangeTaskTitle:(taskId:string,title:string) => void
}

export const Task: FC<PropsType> = React.memo((props) => {
    const dispatch = useAppDispatch()
    const {tasks: {id, title, isDone}, todoId,handleRemoveTask,handleChangeTaskTitle,handleChangeStatus} = props
    const editableTaskTitle = (newTitle:string) => handleChangeTaskTitle(id,newTitle)
    const onRemoveTask = () => handleRemoveTask(id)
    return (
        <ListItem sx={{m: '10px 0', p: 0, gap: 2,display:'flex',justifyContent:'space-between'}}>
            <Box>
                <Checkbox
                    sx={{p: 0}}
                    color={'success'}
                    size={'small'}
                    checked={isDone}
                    onChange={(e) => handleChangeStatus(id,e.currentTarget.checked)}
                />
                <EditableSpan title={title} updateItem={editableTaskTitle}/>
            </Box>
            <IconButton sx={{padding: 0}} onClick={onRemoveTask}>
                <DeleteOutlineIcon color='error'/>
            </IconButton>
        </ListItem>
    )
})