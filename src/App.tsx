import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import {
  createTheme,
  PaletteColorOptions,
  ThemeProvider,
} from '@mui/material/styles'
import Content from './pages'
import { AuthProvider } from './context/auth'
import { DependenciesProvider } from './context/dependencies'
import 'react-toastify/dist/ReactToastify.css'

declare module '@mui/material/styles' {
  interface CustomPalette {
    white: PaletteColorOptions;
  }
  interface Palette extends CustomPalette {}
  interface PaletteOptions extends CustomPalette {}
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    white: true;
  }
}

const App = () => {
  const { palette } = createTheme()
  const { augmentColor } = palette
  const createColor = (mainColor: string) => augmentColor({ color: { main: mainColor } })

  const extendedTheme = createTheme({
    palette: {
      white: createColor('#FFF'),
    },
  })

  return (
    <div className="App">
      <DependenciesProvider>
        <AuthProvider>
          <BrowserRouter>
            <ThemeProvider theme={extendedTheme}>
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
            </ThemeProvider>
          </BrowserRouter>
        </AuthProvider>
      </DependenciesProvider>
    </div>
  )
}

export default App
