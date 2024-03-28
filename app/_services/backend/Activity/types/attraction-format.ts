import { ActivityFormat } from './activity-format'

export interface AttractionFormat extends ActivityFormat {
  priceType: 'per_hour' | 'per_entry'
  place: string
}
