import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import './App.scss'
import Content from './pages'
import { AuthProvider } from './context/auth'

const App = () => (
  <div className="App">
    <AuthProvider>
      <BrowserRouter>
        <Content />
      </BrowserRouter>
    </AuthProvider>
  </div>
)

export default App
