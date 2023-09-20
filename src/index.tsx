import React from 'react'
import './index.css'
import { createRoot } from 'react-dom/client'
import * as serviceWorker from './serviceWorker'
import AppWithUseReducer from './AppWithUseReducer'

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container)
root.render(<AppWithUseReducer />)


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
