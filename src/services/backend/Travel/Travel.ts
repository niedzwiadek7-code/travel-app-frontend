import dayjs from 'dayjs'
import ApiService from '../ApiService'
import { TravelRecipe, Date as DateEntity } from '../../../model'

class Travel {
  private travelUrl = '/travel'

  private apiService: ApiService

  public async get(id: string): Promise<TravelRecipe> {
    const result = await this.apiService.get<TravelRecipe>(`${this.travelUrl}/${id}`)
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

  constructor(token: string) {
    this.apiService = new ApiService(token)
  }
}

export default Travel
