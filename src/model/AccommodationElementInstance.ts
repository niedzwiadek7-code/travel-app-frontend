import Accommodation from './Accommodation'
import AccommodationElement from './AccommodationElement'

class AccommodationElementInstance {
  id: string

  passed: boolean

  photos: string[]

  accommodation: Accommodation

  elementTravel?: AccommodationElement

  constructor(obj: any) {
    this.id = obj.id
    this.passed = obj.passed
    this.photos = obj.photos
    this.accommodation = new Accommodation(obj.accommodation)
    this.elementTravel = obj.elementTravel || undefined
  }
}

export default AccommodationElementInstance
