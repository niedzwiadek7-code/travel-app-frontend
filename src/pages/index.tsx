import React from 'react'
import * as Layout from '../components/Layout'
import Content from './pages'
import { useAuth } from '../context'

const App: React.FC = () => {
  const { loggedIn } = useAuth()

  if (loggedIn) {
    return (
      <Layout.AuthLayout>
        <Content />
      </Layout.AuthLayout>
    )
  }

  return (
    <Layout.PublicLayout>
      <Content />
    </Layout.PublicLayout>
  )
}

export default App
