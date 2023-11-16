import ApiService from '../ApiService'
import { TravelRecipe } from '../../../model'

class Travel {
  private travelUrl = '/travel'

  private apiService: ApiService

  public async get(id: string): Promise<TravelRecipe> {
    return this.apiService.get<TravelRecipe>(`${this.travelUrl}/${id}`)
  }

  constructor(token: string) {
    this.apiService = new ApiService(token)
  }
}

export default Travel
