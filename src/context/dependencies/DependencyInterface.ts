import { BackendInterface } from '../../services/backend'

export interface DependencyInterface {
  getApiService(): BackendInterface,
}
