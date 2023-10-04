import React, {ChangeEvent, useState} from "react";
import {TextField} from "@mui/material";

interface PropsType {
    title: string
    updateItem: (title: string) => void
}

export const EditableSpan: React.FC<PropsType> = React.memo(({updateItem, title}) => {
    const [edit, setEdit] = useState(false)
    const [value, setValue] = useState(title)
    const handleChange = (e:ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value)
    const activateEditMode = () => {
        setEdit(true)
    }
    const deactivateEditMode = () => {
        setEdit(false)
        updateItem(value)
    }
    return edit
        ? <TextField
            value={value}
            onChange={handleChange}
            onBlur={deactivateEditMode}
            autoFocus
            id="standard-basic"
            variant="standard"
            size={'small'}
            sx={{fontFamily:'inherit'}}
        />
        : <span onDoubleClick={activateEditMode} style={{wordBreak:'break-all',marginLeft:"5px"}}>{title}</span>
})