import React from "react";
import { Provider } from "react-redux";
import { reducers } from "../store/index";
import { combineReducers, legacy_createStore } from "redux";
import { taskReducer } from "../store/reducers/task-reducer/task-reducer";
import { todoReducer } from "../store/reducers/todos-reducer/todo-reducer";
import { v1 } from "uuid";

const rootReducer = combineReducers({
  tasks: taskReducer,
  todolists: todoReducer,
});

const initialGlobalState = {
  todolists: [
    { id: "todolistId1", title: "What to learn", filter: "all" },
    { id: "todolistId2", title: "What to buy", filter: "all" },
  ],
  tasks: {
    ["todolistId1"]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: false },
    ],
    ["todolistId2"]: [
      { id: v1(), title: "Milk", isDone: false },
      { id: v1(), title: "React Book", isDone: true },
    ],
  },
};

export const storyBookStore = legacy_createStore(
  rootReducer,
  initialGlobalState as reducers
);

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
  return <Provider store={storyBookStore}>{storyFn()}</Provider>;
};
