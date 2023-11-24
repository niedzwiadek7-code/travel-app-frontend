import TravelElement from './TravelElement'

class TravelRecipe {
  id: number

  name: string

  travelElements: TravelElement[]

  accommodations: TravelElement[]

  countDays: number

  constructor(obj: any) {
    this.id = obj.id
    this.name = obj.name || ''
    this.travelElements = (obj.travelElements || []).map((elem: any) => new TravelElement(elem))
    this.accommodations = (obj.accommodations || []).map((elem: any) => new TravelElement(elem))
    this.countDays = obj.countDays
  }
}

export default TravelRecipe
