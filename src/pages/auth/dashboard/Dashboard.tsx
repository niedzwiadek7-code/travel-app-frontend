import React, { useEffect, useState } from 'react'
import { Home as HomeIcon } from '@mui/icons-material'
import { Stack } from '@mui/material'
import { useTranslation } from 'react-i18next'
import * as Header from '../../../components/Header'
import * as Cards from './Cards'
import { useDependencies, useAuth } from '../../../context'

const Dashboard: React.FC = () => {
  const { getApiService } = useDependencies()
  const apiService = getApiService()
  const { token } = useAuth()
  const userService = apiService.getUser(token)
  const [firstName, setFirstName] = useState<string>('')
  const { t } = useTranslation('translation', { keyPrefix: 'dashboard' })

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
    >
      <Header.Component
        title={`${t('hello')}, ${firstName}`}
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
