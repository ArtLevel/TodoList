import { Provider } from 'react-redux'
import { store } from '../state/store'

export const ReduxStoreProviderDecorator = (story: any) => {
	return <Provider store={store}>{story()}</Provider>
}
