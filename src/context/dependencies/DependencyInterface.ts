import { BackendInterface } from '../../services/backend'
import { ToastInterface } from '../../utils/Toast'

export interface DependencyInterface {
  getApiService(): BackendInterface,
  getToastUtils(): ToastInterface,
}
