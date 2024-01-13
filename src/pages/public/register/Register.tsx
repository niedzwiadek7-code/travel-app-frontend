import React, { useRef } from 'react'
import {
  Button,
  Stack, useTheme,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Email, Key, Badge } from '@mui/icons-material'
import Styles from './Register.module.scss'
import * as Input from '../../../components/UI/Input'
import { useDependencies } from '../../../context/dependencies'
import { useAuth } from '../../../context/auth'
import { Pages } from '../../../pages/pages'

type Inputs = {
  name: string,
  email: string,
  password: string,
  confirmPassword: string,
}

const Register: React.FC = () => {
  const theme = useTheme()
  const { getApiService, getToastUtils } = useDependencies()
  const apiService = getApiService()
  const { setToken } = useAuth()
  const navigate = useNavigate()

  const {
    register, handleSubmit, formState: { errors }, watch,
  } = useForm<Inputs>()

  const password = useRef({})
  password.current = watch('password', '')

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const toastUtils = getToastUtils()
    try {
      const authService = apiService.getAuth()

      const names = data.name.split(' ')
      const lastName = names.splice(names.length - 1, 1)

      const registerData = {
        firstName: names.join(' '),
        lastName,
        email: data.email,
        password: data.password,
      }
      const token = await authService.register(registerData)
      setToken(token)
      navigate(Pages.DASHBOARD.getRedirectLink())
    } catch (err) {
      toastUtils.Toast.showToast(
        toastUtils.types.ERROR,
        'Niepoprawne dane logowania',
      )
    }
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
        Rejestracja
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
        >
          <Input.Component
            variant={Input.Variant.OUTLINED}
            type={Input.Type.TEXT}
            label="Imię i Nazwisko"
            icon={
              <Badge />
            }
            register={register}
            name="name"
            error={errors?.name?.message || ''}
            validation={['required', 'min:3']}
          />

          <Input.Component
            variant={Input.Variant.OUTLINED}
            type={Input.Type.EMAIL}
            label="Email"
            icon={
              <Email />
            }
            register={register}
            name="email"
            validation={['required']}
            error={errors?.email?.message || ''}
          />

          <Input.Component
            variant={Input.Variant.OUTLINED}
            type={Input.Type.PASSWORD}
            label="Hasło"
            icon={
              <Key />
            }
            register={register}
            name="password"
            validation={['required', 'password']}
            error={errors?.password?.message || ''}
          />
        </Stack>

        <Stack
          marginTop={1}
          direction="row"
          gap={1}
          justifyContent="end"
        >
          <Button
            type="button"
            variant="contained"
            className={Styles.button}
            onClick={() => navigate(Pages.WELCOME.getRedirectLink())}
          >
            Powrót
          </Button>

          <Button
            type="submit"
            variant="contained"
            className={Styles.button}
          >
            Zarejestruj się
          </Button>
        </Stack>
      </form>

    </Stack>
  )
}

export default Register
