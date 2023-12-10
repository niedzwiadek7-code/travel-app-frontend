import Activity from './Activity'
import TravelElement from './TravelElement'

class ElementTravelInstance {
  id: string

  passed: boolean

  photos: string[]

  from: string

  to: string

  activity: Activity

  elementTravel?: TravelElement

  constructor(obj: any) {
    this.id = obj.id
    this.passed = obj.passed
    this.photos = obj.photos
    this.from = obj.from
    this.to = obj.to
    this.activity = new Activity(obj.activity)
    this.elementTravel = obj.elementTravel || undefined
  }
}

export default ElementTravelInstance
