import Auth from './Auth/Auth'
import User from './User/User'
import { BackendInterface } from './BackendInterface'

export * from './BackendInterface'

export default class Backend implements BackendInterface {
  getAuth: () => Auth

  // eslint-disable-next-line no-unused-vars
  getUser: (token: string | undefined) => User

  constructor() {
    this.getAuth = () => new Auth()
    this.getUser = (token: string | undefined) => new User(token || '')
  }
}
