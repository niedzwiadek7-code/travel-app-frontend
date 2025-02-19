import axios, { AxiosError } from 'axios'

class ApiService {
  private baseUrl = import.meta.env.VITE_PUBLIC_BACKEND_URL

  token: string

  getHeader(headers: Record<string, string> = {}): Record<string, any> {
    const header: Record<string, any> = {
      headers,
    }

    if (!header.headers['Content-Type']) {
      header.headers['Content-Type'] = 'application/json'
    }

    if (import.meta.env.VITE_PUBLIC_APP_ENV !== 'development') {
      header.withCredentials = true
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

  public async post<T>(
    endpoint: string,
    data?: any,
    headers: Record<string, string> = {},
  ): Promise<T> {
    try {
      const url = `${this.baseUrl}${endpoint}`
      const header = this.getHeader(headers)
      const response = await axios.post<T>(url, data, header)
      return response.data
    } catch (err) {
      const error = err as unknown as AxiosError

      if (error.response) {
        console.error('Error response:', error.response.data)
        throw new Error(JSON.stringify(error.response.data))
      } else if (error.request) {
        console.error('No response received:', error.request)
        throw new Error('No response received from server')
      } else {
        console.error('Request error:', error.message)
        throw new Error(error.message)
      }

      throw new Error(JSON.stringify(error))
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
    try {
      const url = `${this.baseUrl}${endpoint}`
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
