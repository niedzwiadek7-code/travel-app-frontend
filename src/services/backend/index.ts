import Auth from './Auth/Auth'
import { BackendInterface } from './BackendInterface'

export * from './BackendInterface'

export default class Backend implements BackendInterface {
  getAuth: () => Auth

  constructor() {
    this.getAuth = () => new Auth()
  }
}
