import ApiService from '../ApiService'
import { User as UserEntity } from '../../../model'

class User {
  private authUrl = '/user'

  private apiService: ApiService

  public async get(): Promise<UserEntity> {
    return this.apiService.get<UserEntity>(`${this.authUrl}`)
  }

  constructor(token: string) {
    this.apiService = new ApiService(token)
  }
}

export default User
