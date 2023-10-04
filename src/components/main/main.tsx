import React, {useCallback, useState} from "react";
import { Header } from "../header/header"
import {AppDrawer} from "../drawer/drawer";
import {Container, Grid, Paper} from "@mui/material";
import {useAppDispatch} from "../../store/hooks";
import { TodoList } from "../todo-list/todo-list";
import {addNewTodoAC} from "../../store/reducers/todos-reducer/todo-actions";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {useSelector} from "react-redux";
import {AppState} from "../../store";
import {TodoListType} from "../../types/todos-types";

export const Main = () => {
    const [drawerOpen,setDrawerOpen] = useState(false)
    const todoList = useSelector<AppState,TodoListType[]>(state => state.todoList)
    const dispatch = useAppDispatch()
    const addNewTodo = useCallback((title:string) => dispatch(addNewTodoAC(title)),[dispatch])
    const todoListRender = todoList.map(todo => {
        return (
            <Grid item sx={{p:1}} xs={3} key={todo.id}>
                <Paper elevation={5} sx={{p: 1,margin:"0 auto"}}>
                    <TodoList
                        key={todo.id}
                        todoList={todo}
                    />
                </Paper>
            </Grid>
        )
    })
    return (
        <>
            <Header setDrawerOpen={setDrawerOpen}/>
            <AppDrawer drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen}/>
            <Grid container sx={{p: '15px', justifyContent: 'center', alignItems: 'center'}}>
                <AddItemForm callback={addNewTodo}
                             maxLengthValue={10}
                />
            </Grid>
            <Container>
                <Grid container>
                    {todoListRender}
                </Grid>
            </Container>
        </>
    )
}