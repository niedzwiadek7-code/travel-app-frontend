import Activity from './Activity'

export class GloballyTravelElement {
  id: string

  from: number

  to: number

  activity: Activity

  price: number

  numberOfPeople: number

  description: string

  photos: string[]

  constructor(obj: any) {
    this.id = obj.id
    this.from = obj.from
    this.to = obj.to
    this.activity = obj.activity
    this.numberOfPeople = obj.numberOfPeople
    this.price = obj.price
    this.description = obj.description
    this.photos = obj.photos
  }
}
