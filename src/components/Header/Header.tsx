import React, { ReactNode } from 'react'
import {
  Stack, Typography, useTheme,
} from '@mui/material'
import { AccountCircle } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../../context'
import Styles from './Header.module.scss'
import { Pages } from '../../pages/pages'
import { useAppDispatch } from '../../app/hooks'
import { reset as resetTravelRecipe } from '../../features/travelRecipe/travelRecipeSlice'
import { reset as resetTravelInstance } from '../../features/travelInstance/travelInstanceSlice'
import { useRouter } from '../../hooks/useRouter'
import Language from '../Language'
import SplitButton from '../UI/SplitButton/SplitButton'

type Props = {
  title: string,
  icon: ReactNode,
}

const Header: React.FC<Props> = (props) => {
  const theme = useTheme()
  const { setToken, setLoggedIn, setRoles } = useAuth()
  const {
    navigate,
  } = useRouter()
  const dispatch = useAppDispatch()
  const { t } = useTranslation('translation', { keyPrefix: 'header' })

  const logout = () => {
    setLoggedIn(false)
    setToken(undefined)
    setRoles([])
    dispatch(resetTravelInstance())
    dispatch(resetTravelRecipe())
    navigate(Pages.LOGIN.getRedirectLink())
  }

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      className={Styles.header}
    >
      <Typography
        variant="h5"
        style={{ fontWeight: 'bold' }}
      >
        {props.title}
      </Typography>

      <Stack
        style={{
          color: theme.palette.primary.main,
        }}
      >
        {/* TODO: set icon size in this component */}
        {props.icon}
      </Stack>

      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        style={{ color: theme.palette.grey[600] }}
        gap={1}
      >
        <Language />

        <SplitButton
          button={(
            <AccountCircle
              color="primary"
            />
          )}
          options={[
            {
              name: t('logout'),
              action: logout,
            },
          ]}
        />
      </Stack>
    </Stack>
  )
}

export default Header
