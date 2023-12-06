import ElementTravelInstance from './ElementTravelInstance'

class TravelInstance {
  id: number

  from: Date

  to: Date

  travelElements: ElementTravelInstance[]

  constructor(obj: any) {
    this.id = obj.id
    this.from = obj.from
    this.to = obj.to
    this.travelElements = (obj.travelElements || []).map(
      (elem: any) => new ElementTravelInstance(elem),
    )
  }
}

export default TravelInstance
