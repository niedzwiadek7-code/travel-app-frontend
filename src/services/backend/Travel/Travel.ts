import ApiService from '../ApiService'
import { TravelRecipe } from '../../../model'

class Travel {
  private travelUrl = '/travel'

  private apiService: ApiService

  public async get(id: string): Promise<TravelRecipe> {
    return this.apiService.get<TravelRecipe>(`${this.travelUrl}/${id}`)
  }

  public async createTravelRecipe(data: TravelRecipe) {
    const transformedData = {
      ...data,
      travelElements: data.travelElements.map((travelElement) => ({
        ...travelElement,
        activityId: travelElement.activity.id,
      })),
    }
    return this.apiService.post<TravelRecipe>(this.travelUrl, transformedData)
  }

  constructor(token: string) {
    this.apiService = new ApiService(token)
  }
}

export default Travel
