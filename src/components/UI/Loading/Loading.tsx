import React from 'react'
import { CircularProgress, Stack } from '@mui/material'

const Loading: React.FC = () => (
  <Stack
    justifyContent="center"
    alignItems="center"
    sx={{
      height: '100vh',
    }}
  >
    <CircularProgress />
  </Stack>
)

export default Loading
