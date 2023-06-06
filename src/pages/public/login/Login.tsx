import React from 'react'
import {
  Button,
  Stack, useTheme,
} from '@mui/material'
import { Email, Key } from '@mui/icons-material'
import Styles from './Login.module.scss'
import * as Input from '../../../components/UI/Input'

const Welcome: React.FC = () => {
  const theme = useTheme()

  return (
    <Stack
      className={Styles.container}
      spacing={2}
    >
      <h1
        style={{ color: theme.palette.primary.main }}
        className={Styles.header}
      >
        Logowanie
      </h1>

      <Stack
        alignItems="center"
      >
        <div
          className={Styles.description}
          style={{ color: theme.palette.grey[800] }}
        >
          Podaj dane do swojego konta
        </div>
      </Stack>

      <Stack
        spacing={2}
        direction="row"
      >
        <Input.Component
          variant={Input.Variant.OUTLINED}
          type={Input.Type.EMAIL}
          label="Email"
          icon={
            <Email />
          }
        />

        <Input.Component
          variant={Input.Variant.OUTLINED}
          type={Input.Type.PASSWORD}
          label="Hasło"
          icon={
            <Key />
          }
        />
      </Stack>

      <Stack
        alignItems="end"
      >
        <Button
          variant="contained"
          className={Styles.button}
        >
          Zaloguj się
        </Button>
      </Stack>
    </Stack>
  )
}

export default Welcome
