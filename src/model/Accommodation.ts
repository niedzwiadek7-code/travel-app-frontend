import { Activity } from './index'
import { ActivityTypes } from './ActivityTypes'
import User from './User'

interface Rating {
  text: string
  photos: string[]
  author: User
}

class Accommodation extends Activity {
  id: number

  accepted: boolean

  name: string

  description: string

  price: number

  place: string

  ratings: Array<Rating>

  author: User

  constructor(obj: any) {
    super(obj)

    this.activityType = ActivityTypes.ACCOMMODATION
    this.id = obj.id
    this.accepted = obj.accepted
    this.name = obj.name
    this.description = obj.description
    this.price = obj.price
    this.place = obj.place
    this.ratings = obj.ratings
    this.author = obj.author
  }
}

export default Accommodation
