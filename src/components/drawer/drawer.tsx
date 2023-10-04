import {Box, Drawer} from "@mui/material";
import {FC} from "react";
import CloseIcon from '@mui/icons-material/Close';

type PropsType = {
    drawerOpen:boolean
    setDrawerOpen: (b:boolean) => void
}

export const AppDrawer:FC<PropsType> = ({drawerOpen,setDrawerOpen}) => {
    const handleToggleDrawer = () => setDrawerOpen(false)
    return (
        <Drawer anchor='left' open={drawerOpen} onClose={() => setDrawerOpen(false)}>
            <Box sx={{position:"relative", padding:3}}>
                <CloseIcon onClick={handleToggleDrawer} sx={{position:"absolute",top:0,right:0,cursor:'pointer'}}/>
                <Box>some content</Box>
            </Box>

        </Drawer>
    )
}