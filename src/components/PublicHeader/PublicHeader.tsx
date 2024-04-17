import React from 'react'
import { Stack, useTheme } from '@mui/material'
import Language from '../Language'

const PublicHeader: React.FC = () => {
  const theme = useTheme()

  return (
    <Stack
      direction="row"
      justifyContent="flex-end"
      alignItems="center"
      sx={{
        paddingY: theme.spacing(1),
      }}
    >
      <Language />
    </Stack>
  )
}

export default PublicHeader
