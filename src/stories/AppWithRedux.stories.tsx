import AppWithRedux from '../AppWithRedux'
import { ReduxStoreProviderDecorator } from './ReduxStoreProviderDecorator'

export default {
	title: 'AppWithRedux',
	component: AppWithRedux,
	decorators: [ReduxStoreProviderDecorator]
}

export const AppWithReduxBaseExample = () => {
	return <AppWithRedux />
}
