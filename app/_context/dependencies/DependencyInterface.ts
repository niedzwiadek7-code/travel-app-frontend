import { BackendInterface } from '@/app/_services/backend'
import { ToastInterface } from '@/app/_utils/Toast'

export interface DependencyInterface {
  getApiService(): BackendInterface,
  getToastUtils(): ToastInterface,
}
