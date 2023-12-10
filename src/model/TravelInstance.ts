import ElementTravelInstance from './ElementTravelInstance'
import TravelRecipe from './TravelRecipe'

class TravelInstance {
  id: number

  from: Date

  to: Date

  travelRecipe: TravelRecipe

  travelElements: ElementTravelInstance[]

  constructor(obj: any) {
    this.id = obj.id
    this.from = obj.from
    this.to = obj.to
    if (obj.travelRecipe) {
      this.travelRecipe = new TravelRecipe(obj.travelRecipe)
    } else {
      this.travelRecipe = new TravelRecipe({})
    }
    this.travelElements = (obj.travelElements || []).map(
      (elem: any) => new ElementTravelInstance(elem),
    )
  }
}

export default TravelInstance
