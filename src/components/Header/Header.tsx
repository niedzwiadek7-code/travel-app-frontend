import React, { ReactNode } from 'react'
import { Button, Stack, useTheme } from '@mui/material'
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
  const { setToken } = useAuth()
  const navigate = useNavigate()

  const logout = () => {
    setToken(undefined)
    navigate(Pages.LOGIN.getRedirectLink())
  }

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      className={Styles.header}
    >
      <h3
        className={Styles.title}
      >
        {props.title}
      </h3>

      <div
        style={{
          color: theme.palette.primary.main,
        }}
      >
        {/* TODO: set icon size in this component */}
        {props.icon}
      </div>

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
  )
}

export default Header
