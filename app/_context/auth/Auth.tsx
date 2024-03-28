import React, {
  createContext, ReactNode, useContext, useMemo, useState,
} from 'react'
import { useCookies } from 'react-cookie'

import { AuthInterface } from './AuthInterface'

class AuthClass implements AuthInterface {
  token: string | undefined

  // eslint-disable-next-line no-unused-vars
  setToken: (token: string | undefined) => void

  loggedIn: boolean

  // eslint-disable-next-line no-unused-vars
  setLoggedIn: (loggedIn: boolean) => void

  roles: string[] | null

  // eslint-disable-next-line no-unused-vars
  setRoles: (roles: string[] | null) => void

  constructor(
    token: (string | undefined) = undefined,
    // eslint-disable-next-line no-shadow,no-unused-vars
    setToken: (token: string | undefined) => void = () => {},
    loggedIn: boolean = false,
    // eslint-disable-next-line no-shadow,no-unused-vars
    setLoggedIn: (loggedIn: boolean) => void = () => false,
    roles: string[] | null = null,
    // eslint-disable-next-line no-shadow,no-unused-vars
    setRoles: (roles: string[] | null) => void = () => null,
  ) {
    this.token = token
    this.setToken = setToken
    this.loggedIn = loggedIn
    this.setLoggedIn = setLoggedIn
    this.roles = roles
    this.setRoles = setRoles
  }
}

const AuthContext = createContext<AuthInterface>(new AuthClass())

type ProviderProps = {
  children: ReactNode,
}

export function AuthProvider(props: ProviderProps) {
  const [cookies, setCookie, removeCookie] = useCookies(['token', 'roles'])
  const [token, setToken] = useState<string | undefined>(cookies.token)
  const [loggedIn, setLoggedIn] = useState<boolean>(Boolean(cookies.token))
  const [roles, setRoles] = useState<string[]>(cookies.roles || [])

  const setTokenFunction = (tokenFn: string | undefined = undefined) => {
    if (tokenFn) {
      setCookie('token', tokenFn)
      setToken(tokenFn)
      return
    }
    removeCookie('token')
  }

  const setRolesFunction = (rolesFn: string[] | null = []) => {
    if (roles) {
      setCookie('roles', JSON.stringify(rolesFn))
      setRoles(rolesFn || [])
      return
    }
    removeCookie('roles')
    setRoles([])
  }

  const value = useMemo(() => new AuthClass(
    token,
    setTokenFunction,
    loggedIn,
    setLoggedIn,
    roles,
    setRolesFunction,
  ), [token, loggedIn, roles])

  return (
    <AuthContext.Provider
      value={value}
    >
      { props.children }
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
