import React, { FC } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

type PropsType = {
    setDrawerOpen: (b: boolean) => void
}

export const Header:FC<PropsType> = ({setDrawerOpen}) => {
    const openDrawer = () => setDrawerOpen(true)
    return (
        <AppBar position="static" color={'primary'} elevation={0}>
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={openDrawer}
                    sx={{mr: 2}}
                >
                    <MenuIcon/>
                </IconButton>
                <Typography variant="h6" component="div" sx={{flexGrow: 1}}>ToDo</Typography>
                <Button color="inherit">Login</Button>
            </Toolbar>
        </AppBar>
    )
}