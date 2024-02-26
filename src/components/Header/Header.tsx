import React, { ReactNode } from 'react'
import {
  Button, Stack, Typography, useTheme,
} from '@mui/material'
import { Logout as LogoutIcon } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/auth'
import Styles from './Header.module.scss'
import { Pages } from '../../pages/pages'

type Props = {
  title: string,
  icon: ReactNode,
}

const Header: React.FC<Props> = (props) => {
  const theme = useTheme()
  const { setToken, setLoggedIn, setRoles } = useAuth()
  const navigate = useNavigate()

  const logout = () => {
    setLoggedIn(false)
    setToken(undefined)
    setRoles([])
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

      <Stack>
        <Button
          onClick={logout}
        >
          <Stack
            direction="row"
            alignItems="center"
            style={{ color: theme.palette.grey[600] }}
            gap={1}
          >
            <span
              style={{ fontWeight: 'bold' }}
            >
              Wyloguj się
            </span>
            <LogoutIcon />
          </Stack>
        </Button>
      </Stack>

    </Stack>
  )
}

export default Header
