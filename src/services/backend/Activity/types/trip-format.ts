import { ActivityFormat } from './activity-format'

export interface TripFormat extends ActivityFormat {
  from: string
  to: string
}
