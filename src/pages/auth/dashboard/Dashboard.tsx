import React from 'react'
import { Home as HomeIcon } from '@mui/icons-material'
import { Stack } from '@mui/material'
import * as Header from '../../../components/Header'
import * as Cards from './Cards'

const Dashboard: React.FC = () => (
  <Stack
    spacing={3}
    sx={{
      p: 0, m: 3,
    }}
  >
    <Header.Component
      title="Witaj, Damian"
      icon={(
        <HomeIcon
          fontSize="large"
        />
      )}
    />
    <Cards.Component />
  </Stack>
)

export default Dashboard
