import { action } from '@storybook/addon-actions'
import AppWithRedux from '../AppWithRedux'
import { Provider } from 'react-redux'
import { store } from '../state/store'

export default {
	title: 'AppWithRedux',
	component: AppWithRedux
}

const changeCallback = action('Value changed')

export const AppWithReduxBaseExample = () => {
	return (
		<Provider store={store}>
			<AppWithRedux />
		</Provider>
	)
}
