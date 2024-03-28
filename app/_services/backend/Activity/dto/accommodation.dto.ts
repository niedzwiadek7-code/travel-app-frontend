import { ActivityDto } from './activity.dto'

export interface AccommodationDto extends ActivityDto {
  place: string
  price: number
}
