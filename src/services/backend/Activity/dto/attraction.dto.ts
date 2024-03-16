import { ActivityDto } from './activity.dto'

export interface AttractionDto extends ActivityDto {
  place: string
  priceType: 'per_entry' | 'per_hour'
  price: number
}
