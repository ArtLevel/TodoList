import {ChangeEvent, KeyboardEvent, useState} from "react";

export const useAddItemForm = (maxLengthValue: number,callback: (title: string) => void) => {
    const [value, setValue] = useState('')
    const [lengthError,setLengthError] = useState(false)
    const [error,setError] = useState(false)
    const handleAddItem = () => {
        if (value.trim().length !== 0 && value.length <= maxLengthValue) {
            callback(value)
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
        if(target.length > maxLengthValue) {
            setLengthError(true)
        }else if(lengthError){
            setLengthError(false)
        }
        setValue(target)
    }
    const addItemOnEnter = (e:KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') handleAddItem()
    }
    return {
        value,
        handleChange,
        lengthError,
        error,
        addItemOnEnter,
        handleAddItem
    }
}