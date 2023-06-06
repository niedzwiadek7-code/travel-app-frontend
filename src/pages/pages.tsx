import React from 'react'
import { Routes, Route } from 'react-router-dom'
import PageInterface from './interfaces/PageInterface'
import * as Public from './public'

export const Pages: Record<string, PageInterface> = {
  WELCOME: {
    link: '/welcome',
    component: <Public.Welcome.Component />,
  },
}

const App: React.FC = () => (
  <Routes>
    {Object.keys(Pages).map((key) => (
      <Route
        key={key}
        path={Pages[key].link}
        element={Pages[key].component}
      />
    ))}
  </Routes>
)

export default App
