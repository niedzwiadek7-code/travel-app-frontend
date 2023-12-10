import dayjs from 'dayjs'
import ApiService from '../ApiService'
import { TravelRecipe, Date as DateEntity, TravelInstance } from '../../../model'
import { UserTravelRecipeDto, PlanATravelDto, PassTravelElementDto } from './dto'

class Travel {
  private travelUrl = '/travel'

  private apiService: ApiService

  public async get(id: string): Promise<TravelRecipe> {
    const result = await this.apiService.get<TravelRecipe>(`${this.travelUrl}/find/${id}`)
    result.travelElements = result.travelElements.map((elem) => {
      const transformTimeToDate = (time: string) => {
        const timeValues = time.split(':')
        const timeStr = dayjs()
          .set('hour', parseInt(timeValues[0], 10))
          .set('minute', parseInt(timeValues[1], 10))
          .toString()

        return new DateEntity(timeStr)
      }

      const from = transformTimeToDate(elem.from as unknown as string)
      const to = transformTimeToDate(elem.to as unknown as string)

      return {
        ...elem,
        from,
        to,
      }
    })

    return result
  }

  public async getUserTravels(): Promise<UserTravelRecipeDto[]> {
    return this.apiService.get<UserTravelRecipeDto[]>(`${this.travelUrl}/user-list`)
  }

  public async createTravelRecipe(data: TravelRecipe) {
    const transformedData = {
      ...data,
      travelElements: data.travelElements.map((travelElement) => ({
        ...travelElement,
        activityId: travelElement.activity.id,
      })),
      accommodations: data.accommodations.map((accommodationElement) => ({
        ...accommodationElement,
        accommodationId: accommodationElement.accommodation.id,
      })),
    }
    return this.apiService.post<TravelRecipe>(this.travelUrl, transformedData)
  }

  public async putTravelRecipe(data: TravelRecipe) {
    const transformedData = {
      ...data,
      travelElements: data.travelElements.map((travelElement) => ({
        ...travelElement,
        activityId: travelElement.activity.id,
      })),
      accommodations: data.accommodations.map((accommodationElement) => ({
        ...accommodationElement,
        accommodationId: accommodationElement.accommodation.id,
      })),
    }
    return this.apiService.put<TravelRecipe>(`${this.travelUrl}/${data.id}`, transformedData)
  }

  public async createATravelInstance(data: PlanATravelDto) {
    return this.apiService.post<TravelInstance>(`${this.travelUrl}/plan-a-travel`, data)
  }

  public async getTravelInstance(id: string) {
    return this.apiService.get<TravelInstance>(`${this.travelUrl}/find/instance/${id}`)
  }

  public async passTravelElement(id: string, data: PassTravelElementDto) {
    const formData = new FormData()
    data.images.forEach((image) => formData.append('images', image))
    return this.apiService.put<number>(`${this.travelUrl}/pass-travel-element/${id}`, formData, {
      'Content-Type': 'multipart/form-data',
    })
  }

  public async cancelTravelElementInstance(id: string) {
    return this.apiService.post<number>(`${this.travelUrl}/travel-instance/element/cancel/${id}`)
  }

  constructor(token: string) {
    this.apiService = new ApiService(token)
  }
}

export default Travel
