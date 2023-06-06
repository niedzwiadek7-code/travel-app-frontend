/* eslint-disable no-unused-vars */

export interface AuthInterface {
  token: string | undefined,
  setToken: (token: string | undefined) => void,
  loggedIn: boolean,
  setLoggedIn: (loggedIn: boolean) => void
}
