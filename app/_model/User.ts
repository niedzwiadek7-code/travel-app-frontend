import { Roles } from './Roles'

export class User {
  firstName: string

  lastName: string

  email: string

  roles: Roles[]

  constructor(firstName: string, lastName: string, email: string, roles: []) {
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
    this.roles = roles
  }
}
