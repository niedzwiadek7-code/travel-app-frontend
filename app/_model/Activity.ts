import { User } from './User'
import { ActivityType } from './ActivityType'

interface Rating {
  text: string
  photos: string[]
  author: User
}

export class Activity {
  id: number

  accepted: boolean

  name: string

  description: string

  activityType: ActivityType

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
    this.price = obj.price
    this.ratings = obj.ratings

    this.from = obj.from
    this.to = obj.to
    this.place = obj.place
    this.priceType = obj.priceType
  }
}
