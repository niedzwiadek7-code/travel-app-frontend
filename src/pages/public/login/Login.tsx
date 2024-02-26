import React from 'react'
import {
  Button, Grid,
  Stack, useTheme,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Email, Key } from '@mui/icons-material'
import Styles from './Login.module.scss'
import * as Input from '../../../components/UI/Input'
import { useDependencies } from '../../../context/dependencies'
import { useAuth } from '../../../context/auth'
import { Pages } from '../../../pages/pages'

type Inputs = {
  email: string,
  password: string,
}

const Login: React.FC = () => {
  const theme = useTheme()
  const { getApiService, getToastUtils } = useDependencies()
  const apiService = getApiService()
  const { setToken, setLoggedIn, setRoles } = useAuth()
  const navigate = useNavigate()

  const {
    register, handleSubmit, formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const toastUtils = getToastUtils()
    try {
      const authService = apiService.getAuth()
      const token = await authService.login(data)
      setLoggedIn(true)
      setToken(token)

      const userService = apiService.getUser(token)
      const user = await userService.get()
      setRoles(user.roles)
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
        <Grid
          container
          spacing={2}
        >
          <Grid
            item
            xs={12}
            lg={6}
          >
            <Input.Component
              variant={Input.Variant.OUTLINED}
              type={Input.Type.EMAIL}
              label="Email"
              icon={
                <Email />
              }
              register={register}
              name="email"
              validation={['required', 'email']}
              error={errors?.email?.message || ''}
            />
          </Grid>

          <Grid
            item
            xs={12}
            lg={6}
          >
            <Input.Component
              variant={Input.Variant.OUTLINED}
              type={Input.Type.PASSWORD}
              label="Hasło"
              icon={
                <Key />
              }
              register={register}
              name="password"
              validation={['required']}
              error={errors?.password?.message || ''}
            />
          </Grid>
        </Grid>

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
            Zaloguj się
          </Button>
        </Stack>
      </form>

    </Stack>
  )
}

export default Login
