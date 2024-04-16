import React, { useRef, useState } from 'react'
import {
  Button,
  Stack, useTheme,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Email, Key, Badge } from '@mui/icons-material'
import { AxiosError } from 'axios'
import { LoadingButton } from '@mui/lab'
import { useTranslation } from 'react-i18next'
import Styles from './Register.module.scss'
import * as Input from '../../../components/UI/Input'
import { useDependencies, useAuth } from '../../../context'
import { Pages } from '../../pages'

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
  const [btnLoading, setBtnLoading] = useState<boolean>(false)
  const { t } = useTranslation('translation', { keyPrefix: 'register_page' })

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
      navigate(Pages.DASHBOARD.getRedirectLink())
    } catch (err) {
      setBtnLoading(false)
      const error = err as unknown as AxiosError
      if (error) {
        const errorAxios = JSON.parse(error.message)
        if (errorAxios.status === 409) {
          toastUtils.Toast.showToast(
            toastUtils.types.ERROR,
            t('email_already_exists'),
          )
          return
        }
      }

      toastUtils.Toast.showToast(
        toastUtils.types.ERROR,
        t('incorrect_data'),
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
        {t('register')}
      </h1>

      <Stack
        alignItems="center"
      >
        <div
          className={Styles.description}
          style={{ color: theme.palette.grey[800] }}
        >
          {t('description')}
        </div>
      </Stack>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack
          spacing={2}
        >
          <Input.Component
            variant={Input.Variant.OUTLINED}
            type={Input.Type.TEXT}
            // TODO: this should be simplified
            label={t('name')}
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
            label={t('email')}
            icon={
              <Email />
            }
            register={register}
            name="email"
            validation={['required', 'email']}
            error={errors?.email?.message || ''}
          />

          <Input.Component
            variant={Input.Variant.OUTLINED}
            type={Input.Type.PASSWORD}
            label={t('password')}
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
            {t('back')}
          </Button>

          <LoadingButton
            type="submit"
            variant="contained"
            className={Styles.button}
            loading={btnLoading}
          >
            {t('sign_up')}
          </LoadingButton>
        </Stack>
      </form>

    </Stack>
  )
}

export default Register
