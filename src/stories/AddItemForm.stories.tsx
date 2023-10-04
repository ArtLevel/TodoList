import {AddItemForm, FormPropsType} from "../components/AddItemForm/AddItemForm";
import {action} from "@storybook/addon-actions";
import {MainStoreDecorators} from "./MainStoreDecorators";
import {Meta, StoryObj} from "@storybook/react";
import React, {ChangeEvent, FC, KeyboardEvent, useState} from "react";
import {Box, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

// export default {
//     title:"Add item form component",
//     component: AddItemForm,
//     decorators: [MainStoreDecorators]
// }

const meta: Meta<typeof AddItemForm> = {
    title: 'TODOLISTS/AddItemForm',
    component: AddItemForm,
    // This component will have an automatically generated Autodocs entry:
    // https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes:
    // https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        callback: {
            description: 'Button clicked inside form',
            action: 'clicked'
        }
    },
};

export default meta;
type Story = StoryObj<typeof AddItemForm>;

export const AddItemFormStory: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    args: {
        callback: action('Button clicked inside form'),
        maxLengthValue: 10
    },
};
const AddItemFormWithError = (props:FormPropsType) => {
    const [value, setValue] = useState('')
    const [lengthError,setLengthError] = useState(true)
    const [error,setError] = useState(false)
    const handleAddItem = () => {
        if (value.trim().length !== 0 && value.length <= props.maxLengthValue) {
            props.callback(value)
            setValue('')
        } else {
            setError(true)
        }
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const target = e.currentTarget.value
        if (error) {
            setError(false)
        }
        if(target.length > props.maxLengthValue) {
            setLengthError(true)
        }else if(lengthError){
            setLengthError(false)
        }
        setValue(target)
    }
    const addItemOnEnter = (e:KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') handleAddItem()
    }
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
};


export const AddItemFormWithErrorStory: Story = {
    render: () => <AddItemFormWithError callback={action('')} maxLengthValue={10}/>
}