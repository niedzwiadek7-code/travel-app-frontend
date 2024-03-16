import { ActivityFormat } from './activity-format'
import { User } from '../../../../model'

// TODO: should be better typed in the future
export type ExtendedActivityFormat = ActivityFormat & {
  place: string
  priceType: string
  from: string
  to: string
  price: number

  ratings: {
    text: string
    photos: string[]
    author: User
  }
}
