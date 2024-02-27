import ApiService from '../ApiService'

class Auth {
  private authUrl = '/auth'

  private apiService: ApiService

  public async login(data?: any): Promise<string> {
    const response = await this.apiService.post<{access_token: string}>(`${this.authUrl}/signin`, data)
    return response.access_token
  }

  public async register(data?: any): Promise<string> {
    const response = await this.apiService.post<{access_token: string}>(`${this.authUrl}/signup`, data)
    return response.access_token
  }

  constructor() {
    this.apiService = new ApiService('')
  }
}

export default Auth
