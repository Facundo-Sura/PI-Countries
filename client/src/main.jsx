import React from 'react'
import ReactDOM from 'react-dom/client'
import { store } from './redux/store/index.js'
import { Provider } from 'react-redux'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom"


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>
  </BrowserRouter>,
)