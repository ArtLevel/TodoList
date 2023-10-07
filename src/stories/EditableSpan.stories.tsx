import { action } from '@storybook/addon-actions'
import { EditableSpan } from '../EditableSpan'

export default {
	title: 'EditableSpan',
	component: EditableSpan
}

const changeCallback = action('Value changed')

export const EditableSpanBaseExample = () => {
	return <EditableSpan value='start value' onChange={changeCallback} />
}
