import Accommodation from './Accommodation'
import AccommodationElementInstance from './AccommodationElementInstance'

class Rating {
  id: number

  text: string

  accommodationId: string

  accommodation?: Accommodation

  elementTravelId: string

  elementTravel?: AccommodationElementInstance

  sharePhotos: boolean

  constructor(obj: Record<string, any>) {
    this.id = obj.id
    this.text = obj.text
    this.accommodationId = obj.accommodationId
    this.elementTravelId = obj.elementTravelId
    this.sharePhotos = obj.sharePhotos

    if (obj.activity) {
      this.accommodation = new Accommodation(obj.accommodation)
    }
    if (obj.elementTravel) {
      this.elementTravel = new AccommodationElementInstance(obj.elementTravel)
    }
  }
}

export default Rating
