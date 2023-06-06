import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import './App.scss'
import Content from './pages'
import { AuthProvider } from './context/auth'
import { DependenciesProvider } from './context/dependencies'

const App = () => (
  <div className="App">
    <DependenciesProvider>
      <AuthProvider>
        <BrowserRouter>
          <Content />
        </BrowserRouter>
      </AuthProvider>
    </DependenciesProvider>
  </div>
)

export default App
