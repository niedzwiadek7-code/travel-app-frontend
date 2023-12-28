import ElementTravelInstance from './ElementTravelInstance'
import Activity from './Activity'

class Rating {
  id: number

  text: string

  activityId: string

  activity?: Activity

  elementTravelId: string

  elementTravel?: ElementTravelInstance

  sharePhotos: boolean

  constructor(obj: Record<string, any>) {
    this.id = obj.id
    this.text = obj.text
    this.activityId = obj.activityId
    this.elementTravelId = obj.elementTravelId
    this.sharePhotos = obj.sharePhotos

    if (obj.activity) {
      this.activity = new Activity(obj.activity)
    }
    if (obj.elementTravel) {
      this.elementTravel = new ElementTravelInstance(obj.elementTravel)
    }
  }
}

export default Rating
