import axios from 'axios'

class ApiService {
  private baseUrl = 'http://localhost:3000'

  token: string

  getHeader(headers: Record<string, string> = {}): Record<string, any> {
    const header: Record<string, any> = {
      headers,
    }
    if (this.token) {
      header.headers.Authorization = `Bearer ${this.token}`
    }
    return header
  }

  public async get<T>(endpoint: string): Promise<T> {
    try {
      const url = `${this.baseUrl}${endpoint}`
      const header = this.getHeader()
      const response = await axios.get<T>(url, header)
      return response.data
    } catch (err) {
      console.log(err)
      throw new Error()
    }
  }

  public async post<T>(endpoint: string, data?: any): Promise<T> {
    try {
      const url = `${this.baseUrl}${endpoint}`
      const header = this.getHeader()
      const response = await axios.post<T>(url, data, header)
      return response.data
    } catch (err) {
      console.log(err)
      throw new Error()
    }
  }

  public async put<T>(
    endpoint: string,
    data?: any,
    headers: Record<string, string> = {},
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`
    try {
      const header = this.getHeader(headers)
      const response = await axios.put<T>(url, data, header)
      return response.data
    } catch (err) {
      console.log(err)
      throw new Error()
    }
  }

  public async delete<T>(endpoint: string): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`
    try {
      const header = this.getHeader()
      const response = await axios.delete<T>(url, header)
      return response.data
    } catch (err) {
      console.log(err)
      throw new Error()
    }
  }

  constructor(token: string) {
    this.token = token
  }
}

export default ApiService
