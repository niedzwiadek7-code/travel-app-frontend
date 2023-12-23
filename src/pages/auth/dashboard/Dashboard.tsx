import React, { useEffect, useState } from 'react'
import { Home as HomeIcon } from '@mui/icons-material'
import { Stack } from '@mui/material'
import * as Header from '../../../components/Header'
import * as Cards from './Cards'
import { useDependencies } from '../../../context/dependencies'
import { useAuth } from '../../../context/auth'

const Dashboard: React.FC = () => {
  const { getApiService } = useDependencies()
  const apiService = getApiService()
  const { token } = useAuth()
  const userService = apiService.getUser(token)
  const [firstName, setFirstName] = useState<string>('')

  useEffect(() => {
    const fetchData = async () => {
      const user = await userService.get()
      setFirstName(user.firstName)
    }
    fetchData()
  }, [])

  return (
    <Stack
      spacing={3}
      sx={{
        p: 0, m: 3,
      }}
    >
      <Header.Component
        title={`Witaj, ${firstName}`}
        icon={(
          <HomeIcon
            fontSize="large"
          />
        )}
      />
      <Cards.Component />
    </Stack>
  )
}

export default Dashboard
