import ApiService from '../ApiService'
import {
  Paginate,
} from '../../../model'
import {
  AccommodationDto, ActivityDto, AttractionDto, QueryActivityDto, RestaurantDto, TripDto,
} from './dto'
import {
  AccommodationFormat,
  ActivityFormat,
  ActivityType,
  AttractionFormat,
  ExtendedActivityFormat, RestaurantFormat,
  TripFormat,
} from './types'

class Activity {
  private activityUrl = '/activity'

  private apiService: ApiService

  public async get<T extends ActivityFormat = ActivityFormat>(id: string): Promise<T> {
    return this.apiService.get<T>(`${this.activityUrl}/find/${id}`)
  }

  public async getAll(
    source?: QueryActivityDto,
    page: number = 1,
    pageSize: number = 10,
    types: ActivityType[] = [],
  ): Promise<Paginate<ExtendedActivityFormat>> {
    const queryParams = new URLSearchParams({
      source: source || 'all',
      skip: `${page * pageSize - pageSize}`,
      take: pageSize.toString(),
    })

    types.forEach((type) => queryParams.append('types[]', type))

    const { data, total } = await this.apiService
      .get<Paginate<ExtendedActivityFormat>>(`${this.activityUrl}/all?${queryParams.toString()}`)

    return {
      data,
      total,
    }
  }

  public async putAccommodation(data: AccommodationDto, id?: string): Promise<AccommodationFormat> {
    if (id) {
      return this.apiService.put<AccommodationFormat>(`${this.activityUrl}/accommodation/${id}`, data)
    }
    return this.apiService.post<AccommodationFormat>(`${this.activityUrl}/accommodation`, data)
  }

  public async putAttraction(data: AttractionDto, id?: string): Promise<AttractionFormat> {
    if (id) {
      return this.apiService.put<AttractionFormat>(`${this.activityUrl}/attraction/${id}`, data)
    }
    return this.apiService.post<AttractionFormat>(`${this.activityUrl}/attraction`, data)
  }

  public async putTrip(data: TripDto, id?: string): Promise<TripFormat> {
    if (id) {
      return this.apiService.put<TripFormat>(`${this.activityUrl}/trip/${id}`, data)
    }
    return this.apiService.post<TripFormat>(`${this.activityUrl}/trip`, data)
  }

  public async putRestaurant(data: RestaurantDto, id?: string): Promise<RestaurantFormat> {
    if (id) {
      return this.apiService.put<RestaurantFormat>(`${this.activityUrl}/restaurant/${id}`, data)
    }
    return this.apiService.post<RestaurantFormat>(`${this.activityUrl}/restaurant`, data)
  }

  // TODO: param should not be 'any' type
  public async putActivity(data: any, id?: string): Promise<ActivityFormat> {
    const getTransformedData = <T extends ActivityDto>(request: ExtendedActivityFormat): T => ({
      name: request.name,
      description: request.description,
      place: request.place,
      price: request.price,
      priceType: request.priceType,
      from: request.from,
      to: request.to,
    } as unknown as T)

    switch (data.activityType) {
      case 'Accommodation':
        return this.putAccommodation(getTransformedData<AccommodationDto>(data), id)
      case 'Attraction':
        return this.putAttraction(getTransformedData<AttractionDto>(data), id)
      case 'Restaurant':
        return this.putRestaurant(getTransformedData<RestaurantDto>(data), id)
      case 'Trip':
      default:
        return this.putTrip(getTransformedData<TripDto>(data), id)
    }
  }

  public async acceptActivity(id: number): Promise<number> {
    return this.apiService.post<number>(`${this.activityUrl}/accept/${id}`)
  }

  public async restoreActivity(id: number): Promise<number> {
    return this.apiService.delete<number>(`${this.activityUrl}/restore/${id}`)
  }

  constructor(token: string) {
    this.apiService = new ApiService(token)
  }
}

export default Activity
