/* eslint-disable no-unused-vars */

import Auth from './Auth/Auth'
import User from './User/User'
import Activity from './Activity/Activity'
import { BackendInterface } from './BackendInterface'
import Travel from './Travel/Travel'

export * from './BackendInterface'

export default class Backend implements BackendInterface {
  getAuth: () => Auth

  getUser: (token: string | undefined) => User

  getActivity: (token: string | undefined) => Activity

  getTravel: (token: string | undefined) => Travel

  constructor() {
    this.getAuth = () => new Auth()
    this.getUser = (token: string | undefined) => new User(token || '')
    this.getActivity = (token: string | undefined) => new Activity(token || '')
    this.getTravel = (token: string | undefined) => new Travel(token || '')
  }
}
