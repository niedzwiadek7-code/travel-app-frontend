import ApiService from '../ApiService'
import {
  Activity as ActivityEntity,
  ActivityType as ActivityTypeEntity,
  Accommodation as AccommodationEntity,
  Paginate,
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

  public async getAll(
    source?: QueryActivity,
    page: number = 1,
    pageSize: number = 10,
  ): Promise<Paginate<ActivityEntity>> {
    const queryParams = new URLSearchParams({
      source: source || 'all',
      skip: `${page * pageSize - pageSize}`,
      take: pageSize.toString(),
    })

    const { data, total } = await this.apiService
      .get<Paginate<ActivityEntity>>(`${this.activityUrl}/all?${queryParams.toString()}`)

    return {
      data: data.map((result) => new ActivityEntity(result)),
      total,
    }
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

  public async createActivity(data: ActivityDto): Promise<ActivityEntity> {
    return this.apiService.post<ActivityEntity>(`${this.activityUrl}`, data)
  }

  public async putActivity(id: string, data: ActivityDto): Promise<ActivityEntity> {
    return this.apiService.put<ActivityEntity>(`${this.activityUrl}/${id}`, data)
  }

  public async acceptActivity(id: number): Promise<number> {
    return this.apiService.post<number>(`${this.activityUrl}/accept/${id}`)
  }

  public async restoreActivity(id: number): Promise<number> {
    return this.apiService.delete<number>(`${this.activityUrl}/restore/${id}`)
  }

  public async acceptAccommodation(id: string): Promise<number> {
    return this.apiService.post<number>(`${this.activityUrl}/accommodation/accept/${id}`)
  }

  public async restoreAccommodation(id: string): Promise<number> {
    return this.apiService.delete<number>(`${this.activityUrl}/accommodation/restore/${id}`)
  }

  constructor(token: string) {
    this.apiService = new ApiService(token)
  }
}

export default Activity
