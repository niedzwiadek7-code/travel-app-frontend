import { ActivityType } from './ActivityType'
import { ActivityFormat } from '../services/backend/Activity/types'
import User from './User'

export interface Rating {
  text: string
  photos: string[]
  author: User
  createdAt: Date
}

class Activity {
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

  public static fromActivityFormat(obj: ActivityFormat): Activity {
    return new Activity(obj)
  }
}

export default Activity
