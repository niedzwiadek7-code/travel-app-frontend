import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import './App.scss'
import Content from './pages'

const App = () => (
  <div className="App">
    <BrowserRouter>
      <Content />
    </BrowserRouter>
  </div>
)

export default App
