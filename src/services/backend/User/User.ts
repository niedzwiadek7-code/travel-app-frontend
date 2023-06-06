import ApiService from '../ApiService'

class User {
  private authUrl = '/user'

  private apiService: ApiService

  public async get(): Promise<User> {
    return this.apiService.post<User>(`${this.authUrl}`)
  }

  constructor(token: string) {
    this.apiService = new ApiService(token)
  }
}

export default User
