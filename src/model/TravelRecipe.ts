import TravelElement from './TravelElement'

class TravelRecipe {
  id: number

  name: string

  travelElements: TravelElement[]

  constructor(obj: any) {
    this.id = obj.id
    this.name = obj.name || ''
    this.travelElements = (obj.travelElements || []).map((elem: any) => new TravelElement(elem))
  }
}

export default TravelRecipe
