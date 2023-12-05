import Accommodation from './Accommodation'

class AccommodationElement {
  id: string

  numberOfDays: number

  accommodation: Accommodation

  price: number

  description: string

  constructor(obj: any) {
    this.id = obj.id
    this.accommodation = obj.accommodation
    this.numberOfDays = obj.numberOfDays
    this.price = obj.price
    this.description = obj.description
  }
}

export default AccommodationElement
