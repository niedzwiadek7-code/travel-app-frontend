import Auth from './Auth/Auth'

export interface BackendInterface {
  getAuth: () => Auth,
}
