import ApiService from '../ApiService'
import { Activity as ActivityEntity, ActivityType as ActivityTypeEntity } from '../../../model'
import { ActivityDto } from './dto'

class Activity {
  private activityUrl = '/activity'

  private apiService: ApiService

  public async get(id: string): Promise<ActivityEntity> {
    return this.apiService.get<ActivityEntity>(`${this.activityUrl}/find/${id}`)
  }

  public async getAll(): Promise<ActivityEntity[]> {
    return this.apiService.get<ActivityEntity[]>(`${this.activityUrl}/all`)
  }

  public async getTypes(): Promise<ActivityTypeEntity[]> {
    return this.apiService.get<ActivityTypeEntity[]>(`${this.activityUrl}/get-types`)
  }

  public async putActivity(data: ActivityDto): Promise<ActivityEntity> {
    return this.apiService.post<ActivityEntity>(`${this.activityUrl}`, data)
  }

  constructor(token: string) {
    this.apiService = new ApiService(token)
  }
}

export default Activity
