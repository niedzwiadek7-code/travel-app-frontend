import Auth from './Auth/Auth'
import User from './User/User'

export interface BackendInterface {
  getAuth: () => Auth,
  // eslint-disable-next-line no-unused-vars
  getUser: (token: string | undefined) => User,
}
