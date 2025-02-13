import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Button, Stack, Typography, useTheme,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import Style from './Welcome.module.scss'
import { Pages } from '../../pages'
import PublicHeader from '../../../components/PublicHeader'
import { useAuth } from '../../../context'

const Welcome: React.FC = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  const { t } = useTranslation('translation', { keyPrefix: 'welcome' })
  const { token } = useAuth()

  if (token) {
    navigate(Pages.TRAVEL_RECIPES_STORE.getRedirectLink())
  }

  return (
    <Stack>
      <PublicHeader />
      <Stack
        className={Style.container}
        spacing={2}
      >
        <Typography
          color="primary"
          variant="h3"
          component="h1"
        >
          Travel App
        </Typography>

        <Stack
          alignItems="center"
        >
          <Typography
            variant="body1"
            component="p"
            color={theme.palette.grey[800]}
            sx={{
              marginBottom: theme.spacing(3),
            }}
          >
            {t('description')}
          </Typography>
        </Stack>

        <Button
          variant="contained"
          onClick={() => navigate(Pages.REGISTER.getRedirectLink())}
        >
          {t('register')}
        </Button>

        <Button
          variant="contained"
          onClick={() => navigate(Pages.LOGIN.getRedirectLink())}
        >
          {t('login')}
        </Button>
      </Stack>
    </Stack>
  )
}

export default Welcome
