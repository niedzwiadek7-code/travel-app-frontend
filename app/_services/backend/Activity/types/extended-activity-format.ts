import { ActivityFormat } from './activity-format'

// TODO: should be better typed in the future
export type ExtendedActivityFormat = ActivityFormat & {
  place: string
  priceType: string
  from: string
  to: string
  price: number
}
