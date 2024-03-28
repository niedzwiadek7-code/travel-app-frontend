'use client'

import React, { useRef, useState } from 'react'
import {
  Button,
  Stack, Typography, useTheme,
} from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Email, Key, Badge } from '@mui/icons-material'
import { AxiosError } from 'axios'
import { LoadingButton } from '@mui/lab'
import { useRouter } from 'next/navigation'
import Input from '@/app/_components/UI/Input'
import { useAuth, useDependencies } from '@/app/_context'

type Inputs = {
  name: string,
  email: string,
  password: string,
  confirmPassword: string,
}

export default function Register() {
  const theme = useTheme()
  const { getApiService, getToastUtils } = useDependencies()
  const apiService = getApiService()
  const { setToken } = useAuth()
  const [btnLoading, setBtnLoading] = useState<boolean>(false)
  const router = useRouter()

  const {
    register, handleSubmit, formState: { errors }, watch,
  } = useForm<Inputs>()

  const password = useRef({})
  password.current = watch('password', '')

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const toastUtils = getToastUtils()
    setBtnLoading(true)
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
      router.push('/auth/dashboard')
    } catch (err) {
      setBtnLoading(false)
      const error = err as unknown as AxiosError
      if (error) {
        const errorAxios = JSON.parse(error.message)
        // TODO: improve handling duplicate error
        if (errorAxios.status === 409) {
          toastUtils.showToast(
            'error',
            'Użytkownik z podanym mailem już istnieje',
          )
          return
        }
      }

      toastUtils.showToast(
        'error',
        'Niepoprawne dane do rejestracji',
      )
    }
  }

  return (
    <Stack
      sx={{
        marginY: '30%',
        marginX: '1rem',
      }}
      alignItems="center"
      spacing={2}
    >
      <Typography
        variant="h4"
        component="h1"
        color="primary"
        sx={{
          margin: 0,
        }}
      >
        Rejestracja
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
          spacing={2}
          sx={{
            width: '100%',
          }}
        >
          <Input
            variant="outlined"
            type="text"
            label="Imię i Nazwisko"
            icon={
              <Badge />
            }
            register={register}
            name="name"
            error={errors?.name?.message || ''}
            validation={['required', 'min:3']}
          />

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

          <Input
            variant="outlined"
            type="password"
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
          sx={{
            marginTop: '1rem',
          }}
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
            Zarejestruj się
          </LoadingButton>
        </Stack>
      </form>

    </Stack>
  )
}
