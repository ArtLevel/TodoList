import {TodoListType} from "../../../types/todos-types";
import {todoReducer} from "./todo-reducer";
import {addNewTodoAC, changeTodoFilterAC, changeTodoTitleAC, removeTodoAC} from "./todo-actions";

let startState:TodoListType[]
let title:string

beforeEach(() => {
    startState = [
        {id:"1",title:"what to learn",filter:"all"},
        {id:"2",title:"what to buy",filter:"all"},
        {id:"3",title:"what to ear",filter:"all"},
    ]
    title = 'new todo title'
})

describe('todo-reducer',() => {
    test('correct todo should be removed',() => {
        const endState = todoReducer(startState,removeTodoAC('1'))
        expect(endState.length).toBe(2)
    })
    test('correct todo should be added',() => {
        const endState = todoReducer(startState,addNewTodoAC(title))
        expect(endState.length).toBe(4)
        expect(endState[3].title).toBe(title)
    })
    test('correct todo title should be changed',() => {
        const endState = todoReducer(startState,changeTodoTitleAC('1',title))
        expect(endState[0].title).toBe(title)
    })
    test('correct todo filter should be changed',() => {
        const endState = todoReducer(startState,changeTodoFilterAC('1','active'))
        expect(endState[0].filter).toBe('active')
    })
});