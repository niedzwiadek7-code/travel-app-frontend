import Activity from './Activity'
import Date from './Date'

class ElementTravelInstance {
  id: string

  passed: boolean

  photos: string[]

  from: Date

  to: Date

  activity: Activity

  constructor(obj: any) {
    this.id = obj.id
    this.passed = obj.passed
    this.photos = obj.photos
    this.from = obj.from
    this.to = obj.to
    this.activity = obj.activity
  }
}

export default ElementTravelInstance
