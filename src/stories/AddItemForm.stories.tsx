import { AddItemForm } from '../AddItemForm'
import { action } from '@storybook/addon-actions'

export default {
	title: 'AddItemForm',
	component: AddItemForm
}

const callback = action("Button 'add' pressed")

export const AddItemFormBaseExample = () => {
	return <AddItemForm addItem={callback} />
}
