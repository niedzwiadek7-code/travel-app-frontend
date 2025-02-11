import React, { useState } from 'react'
import {
  Button, Grid,
  Stack, useTheme,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Email, Key } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { useTranslation } from 'react-i18next'
import Styles from './Login.module.scss'
import * as Input from '../../../components/UI/Input'
import { useDependencies, useAuth } from '../../../context'
import { Pages } from '../../pages'
import PublicHeader from '../../../components/PublicHeader'

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
  const [btnLoading, setBtnLoading] = useState<boolean>(false)
  const { t } = useTranslation('translation', { keyPrefix: 'login_page' })

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
      navigate(Pages.TRAVEL_RECIPES_STORE.getRedirectLink())
    } catch (err) {
      setBtnLoading(false)
      toastUtils.Toast.showToast(
        toastUtils.types.ERROR,
        t('incorrect_data'),
      )
    }
  }

  return (
    <Stack>
      <PublicHeader />
      <Stack
        className={Styles.container}
        spacing={2}
      >
        <h1
          style={{ color: theme.palette.primary.main }}
          className={Styles.header}
        >
          {t('login')}
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
                label={t('email')}
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
                label={t('password')}
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
              {t('sign_in')}
            </LoadingButton>
          </Stack>
        </form>
      </Stack>
    </Stack>
  )
}

export default Login
