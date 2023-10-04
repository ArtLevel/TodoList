import {TaskType} from "../../types/tasks-types";
import React, {FC, memo, useCallback} from "react";
import {Box, Button, ButtonGroup, List} from "@mui/material";
import {Task} from "../task/Task";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {useAppDispatch} from "../../store/hooks";
import {
    addNewTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC
} from "../../store/reducers/task-reducer/task-actions";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import {changeTodoFilterAC, changeTodoTitleAC, removeTodoAC} from "../../store/reducers/todos-reducer/todo-actions";
import {FilterType, TodoListType} from "../../types/todos-types";
import {useSelector} from "react-redux";
import {AppState} from "../../store";
import {EditableSpan} from "../EditableSpan/EditableSpan";

type PropsType = {
    todoList: TodoListType
}

export const TodoList:FC<PropsType> = React.memo(({todoList:{id,title,filter}}) => {
    const tasks = useSelector<AppState,TaskType[]>(state => state.tasks[id])
    const dispatch = useAppDispatch()
    const handleDeleteTodoList = () => dispatch(removeTodoAC(id))
    const handleAddNewTask = useCallback((newTitle:string) => dispatch(addNewTaskAC(id,newTitle)),[id])
    const handleChangeFilterAll = useCallback(() => dispatch(changeTodoFilterAC(id,'all')),[id])
    const handleChangeFilterActive = useCallback(() => dispatch(changeTodoFilterAC(id,'active')),[id])
    const handleChangeFilterCompleted = useCallback(() => dispatch(changeTodoFilterAC(id,'completed')),[id])
    const handleChangeTodoListTitle = useCallback((newTitle:string) => dispatch(changeTodoTitleAC(id,newTitle)),[id])

    const handleRemoveTask = useCallback((taskId:string) => dispatch(removeTaskAC(id, taskId)),[id])
    const handleChangeStatus = useCallback((taskId:string,isDone: boolean) => {
        dispatch(changeTaskStatusAC(id, taskId, isDone))
    },[id])
    const handleChangeTaskTitle = useCallback((taskId:string,newTitle: string) => {
        dispatch(changeTaskTitleAC(id, taskId, newTitle))
    },[id])

    const filterTask = (task:TaskType[],filter:FilterType) => {
        switch (filter){
            case "active":
                return task.filter(({isDone}) => !isDone)
            case "completed":
                return task.filter(({isDone}) => isDone)
            default: return task
        }
    }
    const filteredTasks = filterTask(tasks,filter)
    const tasksRender = filteredTasks.map(task => {
        return <Task key={task.id}
                     todoId={id}
                     tasks={task}
                     handleRemoveTask={handleRemoveTask}
                     handleChangeStatus={handleChangeStatus}
                     handleChangeTaskTitle={handleChangeTaskTitle}
        />
    })
    return (
        <>
            <Box sx={{textAlign: 'center', fontSize: '20px'}}>
                <EditableSpan title={title} updateItem={handleChangeTodoListTitle}/>
                <IconButton onClick={handleDeleteTodoList}>
                    <DeleteIcon/>
                </IconButton>
            </Box>
            <AddItemForm callback={handleAddNewTask} maxLengthValue={10}/>
            <List sx={{gap:2}}>
                {tasksRender}
            </List>
            {tasks.length > 0 && (
                <ButtonGroup variant="contained" sx={{width:"100%"}}>
                    {/*<Button*/}
                    {/*variant={filter === 'all' ? 'contained' : "outlined"}*/}
                    {/*    onClick={handleChangeFilterAll}*/}
                    {/*    color={filter === 'all' ? 'secondary' : "primary"}*/}
                    {/*>All</Button>*/}
                    {/*<Button*/}
                    {/*variant={filter === 'active' ? 'contained' : "outlined"}*/}
                    {/*onClick={handleChangeFilterActive}*/}
                    {/*    color={filter === 'active' ? 'secondary' : "primary"}*/}
                    {/*>Active</Button>*/}
                    {/*<Button*/}
                    {/*    variant={filter === 'completed' ? 'contained' : "outlined"}*/}
                    {/*    onClick={handleChangeFilterCompleted}*/}
                    {/*    color={filter === 'completed' ? 'secondary' : "primary"}*/}
                    {/*>Completed</Button>*/}
                    <ButtonMemo name={'All'}
                                variant={filter === 'all' ? 'contained' : "outlined"}
                                color={filter === 'all' ? 'secondary' : "primary"}
                                callback={handleChangeFilterAll}
                    />
                    <ButtonMemo name={'Active'}
                                variant={filter === 'active' ? 'contained' : "outlined"}
                                color={filter === 'active' ? 'secondary' : "primary"}
                                callback={handleChangeFilterActive}
                    />
                    <ButtonMemo name={'Completed'}
                                variant={filter === 'completed' ? 'contained' : "outlined"}
                                color={filter === 'completed' ? 'secondary' : "primary"}
                                callback={handleChangeFilterCompleted}
                    />
                </ButtonGroup>
            )}
        </>
    )
})

type ButtonPropsType = {
    color: 'secondary' | "primary"
    variant: 'contained' | "outlined"
    callback: () => void
    name: string
}

const ButtonMemo:FC<ButtonPropsType> = memo((props) => {
    console.log('buttonmemo')
    const {color,variant,name,callback} = props
    return <Button color={color} variant={variant} onClick={callback}>{name}</Button>
})