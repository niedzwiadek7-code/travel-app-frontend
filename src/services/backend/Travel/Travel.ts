import ApiService from '../ApiService'
import {
  TravelRecipe,
  TravelInstance,
  ElementTravelInstance,
  LocallyTravelElement,
  GloballyTravelElement,
} from '../../../model'
import {
  PlanATravelDto,
  AddActivityToTravelInstanceDto,
  PassElementDto, TravelDto, PassTravelElementDto,
} from './dto'
import { TravelFormat } from './types'
import { DateHandler } from '../../../utils/Date'

class Travel {
  private travelUrl = '/travel'

  private apiService: ApiService

  transformTravelFormatToTravelRecipe(result: TravelFormat): TravelRecipe {
    return new TravelRecipe({
      id: result.id,
      name: result.name,
      countDays: result.countDays,
      travelElements: result.travelElementsLocally
        .map((e) => new LocallyTravelElement(e)),
      accommodations: result.travelElementsGlobally
        .filter((e) => e.activity.activityType === 'Accommodation')
        .map((e) => new GloballyTravelElement(e)),
    })
  }

  transformTravelRecipeToTravelDto(data: TravelRecipe): TravelDto {
    return {
      name: data.name,
      countDays: data.countDays,
      travelElements: [
        ...data.travelElements.map((elem) => ({
          activityId: elem.activity.id,
          price: elem.price,
          numberOfPeople: elem.numberOfPeople,
          description: elem.description,
          travelElementLocally: {
            dayCount: elem.dayCount,
            from: new DateHandler(elem.from).format('HH:mm'),
            to: new DateHandler(elem.to).format('HH:mm'),
          },
        })),
        ...data.accommodations.map((elem) => ({
          activityId: elem.activity.id,
          price: elem.price,
          numberOfPeople: elem.numberOfPeople,
          description: elem.description,
          travelElementGlobally: {
            from: elem.from,
            to: elem.to,
          },
        })),
      ],
    }
  }

  public async get(id: string): Promise<TravelRecipe> {
    const result = await this.apiService.get<TravelFormat>(`${this.travelUrl}/find/${id}`)

    return this.transformTravelFormatToTravelRecipe(result)
  }

  public async getUserTravels(): Promise<TravelRecipe[]> {
    const results = await this.apiService.get<TravelFormat[]>(`${this.travelUrl}/user-list`)

    return results.map(this.transformTravelFormatToTravelRecipe)
  }

  public async createTravelRecipe(data: TravelRecipe): Promise<TravelRecipe> {
    const transformedData = this.transformTravelRecipeToTravelDto(data)
    const result = await this.apiService.post<TravelFormat>(this.travelUrl, transformedData)
    return this.transformTravelFormatToTravelRecipe(result)
  }

  public async putTravelRecipe(data: TravelRecipe): Promise<TravelRecipe> {
    const transformedData = this.transformTravelRecipeToTravelDto(data)
    const result = await this.apiService.put<TravelFormat>(`${this.travelUrl}/${data.id}`, transformedData)
    return this.transformTravelFormatToTravelRecipe(result)
  }

  public async createATravelInstance(data: PlanATravelDto): Promise<TravelInstance> {
    return this.apiService.post<TravelInstance>(`${this.travelUrl}/plan-a-travel`, data)
  }

  public async getTravelInstance(id: string): Promise<TravelInstance> {
    return this.apiService.get<TravelInstance>(`${this.travelUrl}/find/instance/${id}`)
  }

  public async passTravelElement(id: number, data: PassTravelElementDto) {
    const formData = new FormData()
    Array.from(data.images).forEach((image) => formData.append('images', image))
    return this.apiService.put<PassElementDto>(`${this.travelUrl}/pass-travel-element/${id}`, formData, {
      'Content-Type': 'multipart/form-data',
    })
  }

  public async cancelTravelElementInstance(id: number) {
    return this.apiService.post<number>(`${this.travelUrl}/travel-instance/element/cancel/${id}`)
  }

  public async getAllTravelInstances() {
    return this.apiService.get<TravelInstance[]>(`${this.travelUrl}/instance/all`)
  }

  public async deleteInstance(id: string) {
    return this.apiService.delete<number>(`${this.travelUrl}/instance/delete/${id}`)
  }

  public async addActivityToTravelInstance(id: string, data: AddActivityToTravelInstanceDto) {
    return this.apiService.post<ElementTravelInstance>(
      `${this.travelUrl}/travel-instance/activity/add/${id}`,
      data,
    )
  }

  constructor(token: string) {
    this.apiService = new ApiService(token)
  }
}

export default Travel
