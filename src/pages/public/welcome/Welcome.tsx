import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Button, Stack, Typography, useTheme,
} from '@mui/material'
import { useTranslation, withTranslation } from 'react-i18next'
import Style from './Welcome.module.scss'
import { Pages } from '../../pages'

const Welcome: React.FC = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  const { t } = useTranslation('translation', { keyPrefix: 'welcome' })

  return (
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
  )
}

export default withTranslation()(Welcome)
