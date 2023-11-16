/* eslint-disable no-unused-vars */

import Auth from './Auth/Auth'
import User from './User/User'
import Activity from './Activity/Activity'
import Travel from './Travel/Travel'

export interface BackendInterface {
  getAuth: () => Auth
  getUser: (token: string | undefined) => User
  getActivity: (token: string | undefined) => Activity
  getTravel: (token: string | undefined) => Travel
}
