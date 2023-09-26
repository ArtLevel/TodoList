import React, {ChangeEvent} from 'react';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {FilterValuesType} from "./App";
import IconButton from '@mui/material/IconButton';
import {Delete} from "@mui/icons-material";
import {Button, Checkbox} from "@mui/material";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
}

export function Todolist(props: PropsType) {
    const addTask = (title: string) => {
        console.log('addTask')
    }

    const removeTodolist = () => {
        console.log('removeTodolist')
    }
    const changeTodolistTitle = (title: string) => {
        console.log('changeTodolistTitle')
    }

    const onAllClickHandler = () => alert('changeFilter all')
    const onActiveClickHandler = () => alert('changeFilter active')
    const onCompletedClickHandler = () => alert('changeFilter completed')

    return <div>
        <h3> <EditableSpan value={props.title} onChange={changeTodolistTitle} />
            <IconButton onClick={removeTodolist}>
                <Delete />
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => console.log('removeTask')
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        console.log('changeTaskStatus')
                    }
                    const onTitleChangeHandler = (newValue: string) => {
                        console.log('changeTaskTitle')
                    }


                    return <div key={t.id} className={t.isDone ? "is-done" : ""}>
                        <Checkbox
                            checked={t.isDone}
                            color="primary"
                            onChange={onChangeHandler}
                        />

                        <EditableSpan value={t.title} onChange={onTitleChangeHandler} />
                        <IconButton onClick={onClickHandler}>
                            <Delete />
                        </IconButton>
                    </div>
                })
            }
        </div>
        <div style={{ paddingTop: "10px"}}>
            <Button variant={props.filter === 'all' ? 'outlined' : 'text'}
                    onClick={onAllClickHandler}
                    color={'inherit'}
            >All
            </Button>
            <Button variant={props.filter === 'active' ? 'outlined' : 'text'}
                    onClick={onActiveClickHandler}
                    color={'primary'}>Active
            </Button>
            <Button variant={props.filter === 'completed' ? 'outlined' : 'text'}
                    onClick={onCompletedClickHandler}
                    color={'secondary'}>Completed
            </Button>
        </div>
    </div>
}


