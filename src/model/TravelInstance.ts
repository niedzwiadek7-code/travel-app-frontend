import ElementTravelInstance from './ElementTravelInstance'
import TravelRecipe from './TravelRecipe'

class TravelInstance {
  id: number

  from: string

  to: string

  travelRecipe: TravelRecipe

  travelElements: ElementTravelInstance[]

  constructor(obj: any) {
    this.id = obj.id
    this.from = obj.from
    this.to = obj.to
    this.travelRecipe = new TravelRecipe(obj.travelRecipe || {})
    this.travelElements = (obj.travelElements || []).map(
      (elem: any) => new ElementTravelInstance(elem),
    )
  }
}

export default TravelInstance
