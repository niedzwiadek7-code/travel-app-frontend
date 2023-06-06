import React from 'react'
import { Button, Stack, useTheme } from '@mui/material'
import Style from './Welcome.module.scss'

const Welcome: React.FC = () => {
  const theme = useTheme()

  return (
    <Stack
      className={Style.container}
      spacing={2}
    >
      <h1
        style={{ color: theme.palette.primary.main }}
        className={Style.header}
      >
        Travel App
      </h1>

      <Stack
        alignItems="center"
      >
        <div
          className={Style.description}
          style={{ color: theme.palette.grey[800] }}
        >
          Dołącz do naszej społeczności i rozpocznij podróżowanie z naszą aplikacją
        </div>
      </Stack>

      <Button
        variant="contained"
      >
        Stwórz nowe konto
      </Button>

      <Button
        variant="contained"
      >
        Zaloguj się do istniejącego konta
      </Button>
    </Stack>
  )
}

export default Welcome
