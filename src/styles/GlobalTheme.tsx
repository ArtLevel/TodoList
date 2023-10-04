import {createTheme} from "@mui/material";

export const theme = createTheme({
    palette: {
        primary: {
            main: '#54445d'
        },
        error: {
            main: '#a80f05'
        },
        success: {
            main: '#39cb28'
        },
        secondary: {
            main: '#64bdde'
        },
        text: {
            primary: 'rgba(0, 0, 0, 0.87)',
            secondary: 'rgba(0, 0, 0, 0.6)',
            disabled: 'rgba(0, 0, 0, 0.38)',
        },
        divider: 'rgba(0, 0, 0, 0.12)',
        background: {
            paper: '#fff',
            default: '#fff',
        },
    }
})