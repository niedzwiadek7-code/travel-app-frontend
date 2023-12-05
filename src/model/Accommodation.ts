import { Activity } from './index'
import { ActivityTypes } from './ActivityTypes'

class Accommodation extends Activity {
  id: number

  accepted: boolean

  name: string

  description: string

  price: number

  place: string

  constructor(obj: any) {
    super(obj)

    this.activityType = ActivityTypes.ACCOMMODATION
    this.id = obj.id
    this.accepted = obj.accepted
    this.name = obj.name
    this.description = obj.description
    this.price = obj.price
    this.place = obj.place
  }
}

export default Accommodation
