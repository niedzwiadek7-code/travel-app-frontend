import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Page from './class/Page'
import * as Public from './public'

export const Pages: Record<string, Page> = {
  WELCOME: new Page(
    '/welcome',
    <Public.Welcome.Component />,
  ),
  LOGIN: new Page(
    '/login',
    <Public.Login.Component />,
  ),
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
