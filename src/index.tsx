import React from 'react';
import ReactDOM from 'react-dom/client';
import {Main} from "./components/main/main";
import './styles/index.css';
import {ThemeProvider} from "@mui/material";
import {theme} from "./styles/GlobalTheme";
import {Provider} from "react-redux";
import {store} from "./store";


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <Main />
        </ThemeProvider>
    </Provider>
);
