import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './app/App'
import { store } from 'app/store'
import { Provider } from 'react-redux'

const root = createRoot(document.getElementById('root') as HTMLElement)
root.render(
	<Provider store={store}>
		<App />
	</Provider>
)

// 1 yes
// 2 yes
// 3
// 4 yes
// 5 yes
// 6 yes
// 7
// 8
// 9
