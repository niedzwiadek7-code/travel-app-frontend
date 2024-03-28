import { ActivityType } from './activity-type'

interface Rating {
  author: {
    firstName: string,
    lastName: string,
    email: string,
  },
  text: string,
  photos: Array<string>,
}

export interface ActivityFormat {
  id: number,
  accepted: boolean,
  name: string,
  description: string,
  activityType: ActivityType
  ratings: Array<Rating>,
  price?: number,
}
