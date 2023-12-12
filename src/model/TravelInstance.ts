import ElementTravelInstance from './ElementTravelInstance'
import TravelRecipe from './TravelRecipe'
import AccommodationElementInstance from './AccommodationElementInstance'

class TravelInstance {
  id: number

  from: string

  to: string

  travelRecipe: TravelRecipe

  travelElements: ElementTravelInstance[]

  accommodationElements: AccommodationElementInstance[]

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
    this.accommodationElements = (obj.accommodationsElements || []).map(
      (elem: any) => new AccommodationElementInstance(elem),
    )
  }
}

export default TravelInstance
