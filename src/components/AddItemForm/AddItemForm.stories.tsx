import React from 'react'
import {action} from '@storybook/addon-actions'
import {AddItemForm} from './AddItemForm'

export default {
    title: 'AddItemForm Stories',
    component: AddItemForm
}

export const AddItemFormBaseExample = (props: any) => {
    return (<AddItemForm
        addItem={action('Button inside form clicked')}
    />)
}


export const AddItemFormDisabledExample = (props: any) => {
    return (<AddItemForm disabled={true}
        addItem={action('Button inside form clicked')}
    />)
}
