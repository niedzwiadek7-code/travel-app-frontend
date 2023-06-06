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

  constructor(
    token: (string | undefined) = undefined,
    // eslint-disable-next-line no-shadow,no-unused-vars
    setToken: (token: string | undefined) => void = () => {},
    loggedIn: boolean = false,
    // eslint-disable-next-line no-shadow,no-unused-vars
    setLoggedIn: (loggedIn: boolean) => void = () => false,
  ) {
    this.token = token
    this.setToken = setToken
    this.loggedIn = loggedIn
    this.setLoggedIn = setLoggedIn
  }
}

const AuthContext = createContext<AuthInterface>(new AuthClass())

type ProviderProps = {
  children: ReactNode,
}

export const AuthProvider: React.FC<ProviderProps> = (props) => {
  const [cookies, setCookie, removeCookie] = useCookies(['token'])
  const [token, setToken] = useState<string | undefined>(cookies.token)
  const [loggedIn, setLoggedIn] = useState<boolean>(Boolean(cookies.token))

  const setTokenFunction = (tokenFn: string | undefined = undefined) => {
    if (tokenFn) {
      setCookie('token', tokenFn)
      setToken(tokenFn)
      return
    }
    removeCookie('token')
  }

  const value = useMemo(() => new AuthClass(
    token,
    setTokenFunction,
    loggedIn,
    setLoggedIn,
  ), [token, loggedIn])

  return (
    <AuthContext.Provider
      value={value}
    >
      { props.children }
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
