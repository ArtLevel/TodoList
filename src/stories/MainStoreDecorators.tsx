import {Provider} from "react-redux";
import {AppState, reducers} from "../store";
import {ThemeProvider} from "@mui/material";
import {theme} from "../styles/GlobalTheme";
import {legacy_createStore} from "redux";

const initialState = {
    todoList: [
        {id:'1',title:'what to learn',filter:'all'},
        {id:'2',title:'what to buy',filter:'active'},
        {id:'3',title:'what to eat',filter:'completed'},
    ],
    tasks: {
        ['1']: [
            {id:'1',title:'new title',isDone:true},
            {id:'2',title:'new title',isDone:false},
        ],
        ['2']: [
            {id:'1',title:'new title',isDone:false},
            {id:'2',title:'new title',isDone:true},
        ],
        ['3']: [
            {id:'1',title:'new title',isDone:true},
            {id:'2',title:'new title',isDone:false},
        ],
    }
}

export const storyBookStore = legacy_createStore(reducers, initialState as AppState)

export const MainStoreDecorators = (story: any) => {
    return (
        <Provider store={storyBookStore}>
            <ThemeProvider theme={theme}>
                {story()}
            </ThemeProvider>
        </Provider>
    )
}