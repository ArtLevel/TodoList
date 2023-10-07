import { AddItemForm } from '../AddItemForm'

export default {
	title: 'AddItemForm',
	component: AddItemForm
}

export const AddItemFormBaseExample = () => {
	return <AddItemForm addItem={(title) => console.log(title)} />
}
