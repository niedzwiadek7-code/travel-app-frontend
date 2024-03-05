import User from './User'

interface Rating {
  text: string
  photos: string[]
  author: User
}

class Activity {
  id: number

  accepted: boolean

  name: string

  description: string

  activityType: string

  price: number

  ratings: Array<Rating>

  from: string

  to: string

  place: string

  priceType: string

  constructor(obj: any) {
    this.id = obj.id
    this.accepted = obj.accepted
    this.name = obj.name
    this.description = obj.description
    this.activityType = obj.activityType
    this.price = obj.number
    this.ratings = obj.ratings

    this.from = obj.from
    this.to = obj.to
    this.place = obj.place
    this.priceType = obj.priceType
  }
}

export default Activity
