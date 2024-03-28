'use client'

import React from 'react'
import {
  Button, Stack, Typography, useTheme,
} from '@mui/material'
import { useRouter } from 'next/navigation'

export default function Welcome() {
  const theme = useTheme()
  const router = useRouter()

  return (
    <Stack
      alignItems="center"
      gap={2}
      sx={{
        marginY: '30%',
        marginX: '1rem',
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        color="primary"
        sx={{
          margin: 0,
        }}
      >
        Travel App
      </Typography>

      <Stack
        alignItems="center"
      >
        <Typography
          variant="body1"
          align="center"
          color={theme.palette.grey[800]}
          sx={{
            maxWidth: '25rem',
            marginBottom: '1.5rem',
          }}
        >
          Dołącz do naszej społeczności i rozpocznij podróżowanie z naszą aplikacją
        </Typography>
      </Stack>

      <Button
        variant="contained"
        sx={{
          width: '100%',
        }}
        onClick={() => router.push('/public/register')}
      >
        Stwórz nowe konto
      </Button>

      <Button
        variant="contained"
        sx={{
          width: '100%',
        }}
        onClick={() => router.push('/public/login')}
      >
        Zaloguj się do istniejącego konta
      </Button>
    </Stack>
  )
}
