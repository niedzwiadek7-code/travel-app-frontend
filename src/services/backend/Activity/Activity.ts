import ApiService from '../ApiService'
import {
  Activity as ActivityEntity,
  ActivityType as ActivityTypeEntity,
  Accommodation as AccommodationEntity,
} from '../../../model'
import { ActivityDto } from './dto'
import { QueryActivity } from './dto/query-activity'

class Activity {
  private activityUrl = '/activity'

  private apiService: ApiService

  public async get(id: string): Promise<ActivityEntity> {
    return this.apiService.get<ActivityEntity>(`${this.activityUrl}/find/${id}`)
  }

  public async getAccommodation(id: string): Promise<AccommodationEntity> {
    return this.apiService.get<AccommodationEntity>(`${this.activityUrl}/accommodation/find/${id}`)
  }

  public async getAll(source?: QueryActivity): Promise<ActivityEntity[]> {
    return this.apiService.get<ActivityEntity[]>(`${this.activityUrl}/all?source=${source}`)
  }

  public async getAllAccommodations(source?: QueryActivity): Promise<AccommodationEntity[]> {
    const results = await this.apiService.get<AccommodationEntity[]>(
      `${this.activityUrl}/accommodation/all?source=${source}`,
    )
    return results.map((result) => new AccommodationEntity(result))
  }

  public async getTypes(): Promise<ActivityTypeEntity[]> {
    return this.apiService.get<ActivityTypeEntity[]>(`${this.activityUrl}/get-types`)
  }

  public async putActivity(data: ActivityDto): Promise<ActivityEntity> {
    return this.apiService.post<ActivityEntity>(`${this.activityUrl}`, data)
  }

  public async acceptActivity(id: string): Promise<number> {
    return this.apiService.post<number>(`${this.activityUrl}/accept/${id}`)
  }

  public async restoreActivity(id: string): Promise<number> {
    return this.apiService.delete(`${this.activityUrl}/restore/${id}`)
  }

  constructor(token: string) {
    this.apiService = new ApiService(token)
  }
}

export default Activity
