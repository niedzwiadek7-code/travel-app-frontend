import ApiService from '../ApiService'
import { Activity as ActivityEntity, ActivityType as ActivityTypeEntity } from '../../../model'

class Activity {
  private activityUrl = '/activity'

  private apiService: ApiService

  public async get(id: string): Promise<ActivityEntity> {
    return this.apiService.get<ActivityEntity>(`${this.activityUrl}/find/${id}`)
  }

  public async getTypes(): Promise<ActivityTypeEntity[]> {
    return this.apiService.get<ActivityTypeEntity[]>(`${this.activityUrl}/get-types`)
  }

  constructor(token: string) {
    this.apiService = new ApiService(token)
  }
}

export default Activity
