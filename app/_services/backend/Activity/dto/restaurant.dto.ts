import { ActivityDto } from './activity.dto'

export interface RestaurantDto extends ActivityDto {
  place: string
}
