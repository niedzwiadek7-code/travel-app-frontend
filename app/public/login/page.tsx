'use client'

import React, { useState } from 'react'
import {
  Button, Grid,
  Stack, Typography, useTheme,
} from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Email, Key } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { useRouter } from 'next/navigation'
import Input from '../../_components/UI/Input'
import { useDependencies, useAuth } from '../../_context'

type Inputs = {
  email: string,
  password: string,
}

export default function Login() {
  const theme = useTheme()
  const { getApiService, getToastUtils } = useDependencies()
  const apiService = getApiService()
  const { setToken, setLoggedIn, setRoles } = useAuth()
  const [btnLoading, setBtnLoading] = useState<boolean>(false)
  const router = useRouter()

  const {
    register, handleSubmit, formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const toastUtils = getToastUtils()
    setBtnLoading(true)

    try {
      const authService = apiService.getAuth()
      const token = await authService.login(data)
      setLoggedIn(true)
      setToken(token)

      const userService = apiService.getUser(token)
      const user = await userService.get()
      setRoles(user.roles)
      router.push('/auth/dashboard')
    } catch (err) {
      setBtnLoading(false)
      toastUtils.showToast(
        'error',
        'Niepoprawne dane logowania',
      )
    }
  }

  return (
    <Stack
      alignItems="center"
      gap={1}
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
        Logowanie
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
          Podaj dane do swojego konta
        </Typography>
      </Stack>

      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          width: '100%',
        }}
      >
        <Stack
          gap={1}
          sx={{
            width: '100%',
          }}
        >
          <Grid
            container
            spacing={2}
          >
            <Grid
              item
              xs={12}
              lg={6}
            >
              <Input
                variant="outlined"
                type="email"
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
              <Input
                variant="outlined"
                type="password"
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
            marginTop={2}
            direction="row"
            gap={1}
            justifyContent="end"
          >
            <Button
              type="button"
              variant="contained"
              sx={{
                width: '200px',
              }}
              onClick={() => router.push('/public')}
            >
              Powrót
            </Button>

            <LoadingButton
              type="submit"
              variant="contained"
              sx={{
                width: '200px',
              }}
              loading={btnLoading}
            >
              Zaloguj się
            </LoadingButton>
          </Stack>
        </Stack>
      </form>

    </Stack>
  )
}
