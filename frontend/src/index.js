import App from './App'                             //App import
import React from 'react'                           //React import
import ReactDOM from 'react-dom/client'             //React dom import
import { BrowserRouter } from 'react-router-dom'    //React router dom import (BrowserRouter)

const root = ReactDOM.createRoot(document.getElementById('root'))   //Retrieval of the element with id root (in index.html)

root.render(                                        //Root render (display)
    <BrowserRouter>
        <App />
    </BrowserRouter>
)