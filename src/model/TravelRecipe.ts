import LocallyTravelElement from './LocallyTravelElement'
import { GloballyTravelElement } from './GloballyTravelElement'

class TravelRecipe {
  id: number

  name: string

  travelElements: LocallyTravelElement[]

  accommodations: GloballyTravelElement[]

  countDays: number

  constructor(obj: any) {
    this.id = obj.id
    this.name = obj.name || ''

    this.travelElements = (obj.travelElements || [])
      .map((elem: any) => new LocallyTravelElement(elem))

    this.accommodations = (obj.accommodations || [])
      .map((elem: any) => new GloballyTravelElement(elem))

    this.countDays = obj.countDays
  }
}

export default TravelRecipe
