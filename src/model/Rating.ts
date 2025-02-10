import ElementTravelInstance from './ElementTravelInstance'
import Activity from './Activity'
import User from './User'

class Rating {
  id: number

  text: string

  authorId: string

  author?: User

  activityId: string

  activity?: Activity

  elementTravelId: string

  elementTravel?: ElementTravelInstance

  sharePhotos: boolean

  createdAt: Date

  updatedAt: Date

  constructor(obj: Record<string, any>) {
    this.id = obj.id
    this.text = obj.text
    this.activityId = obj.activityId
    this.elementTravelId = obj.elementTravelId
    this.sharePhotos = obj.sharePhotos
    this.authorId = obj.authorId
    this.createdAt = obj.created_at
    this.updatedAt = obj.updated_at

    if (obj.activity) {
      this.activity = new Activity(obj.activity)
    }
    if (obj.elementTravel) {
      this.elementTravel = new ElementTravelInstance(obj.elementTravel)
    }
    if (obj.author) {
      this.author = obj.author
    }
  }
}

export default Rating
