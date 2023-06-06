import React from 'react'
import {
  Button,
  Stack, useTheme,
} from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Email, Key } from '@mui/icons-material'
import Styles from './Login.module.scss'
import * as Input from '../../../components/UI/Input'

type Inputs = {
  email: string,
  password: string,
}

const Login: React.FC = () => {
  const theme = useTheme()

  const {
    register, handleSubmit, formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data)
  }

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

      <form onSubmit={handleSubmit(onSubmit)}>
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
            data={register('email')}
            error={errors?.email?.message || ''}
          />

          <Input.Component
            variant={Input.Variant.OUTLINED}
            type={Input.Type.PASSWORD}
            label="Hasło"
            icon={
              <Key />
            }
            data={register('password', { required: { value: true, message: 'To pole jest wymagane' } })}
            error={errors?.password?.message || ''}
          />
        </Stack>

        <Stack
          alignItems="end"
        >
          <Button
            type="submit"
            variant="contained"
            className={Styles.button}
          >
            Zaloguj się
          </Button>
        </Stack>
      </form>

    </Stack>
  )
}

export default Login
