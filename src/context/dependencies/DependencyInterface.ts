import { BackendInterface } from '../../services/backend'
import { ToastInterface, Types } from '../../utils/Toast'

export interface DependencyInterface {
  getApiService(): BackendInterface,
  getToastUtils(): { Toast: ToastInterface, types: typeof Types.Type },
}
