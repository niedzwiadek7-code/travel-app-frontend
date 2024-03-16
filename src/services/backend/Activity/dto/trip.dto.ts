import { ActivityDto } from './activity.dto'

export interface TripDto extends ActivityDto {
  from: string
  to: string
  price: number
}
