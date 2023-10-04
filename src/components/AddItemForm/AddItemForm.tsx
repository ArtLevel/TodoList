import {Box, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';
import {FC } from "react";
import React from "react";
import {useAddItemForm} from "./hooks/useAddItemForm";

export type FormPropsType = {
    callback: (title: string) => void
    maxLengthValue: number
}

export const AddItemForm: FC<FormPropsType> = React.memo(({callback,maxLengthValue}) => {
    const {value,handleChange,lengthError, error,
        addItemOnEnter,handleAddItem
    } = useAddItemForm(maxLengthValue,callback)
    return (
        <Box sx={{display: 'flex', alignItems: 'center'}}>
            <TextField
                size={'small'}
                id="standard-basic"
                variant="outlined"
                value={value}
                onChange={handleChange}
                sx={{padding:0}}
                error={lengthError || error}
                onKeyDown={addItemOnEnter}
            />
            <Button
                onClick={handleAddItem}
                size={"small"}
                disableElevation
                variant={'contained'}
                sx={{padding: 1}}
            ><AddIcon fontSize={"small"}/>
            </Button>
        </Box>
    )
})