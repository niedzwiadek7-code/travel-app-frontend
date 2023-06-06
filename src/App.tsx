import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Content from './pages'
import { AuthProvider } from './context/auth'
import { DependenciesProvider } from './context/dependencies'
import 'react-toastify/dist/ReactToastify.css'

const App = () => (
  <div className="App">
    <DependenciesProvider>
      <AuthProvider>
        <BrowserRouter>
          <Content />

          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </BrowserRouter>
      </AuthProvider>
    </DependenciesProvider>
  </div>
)

export default App
