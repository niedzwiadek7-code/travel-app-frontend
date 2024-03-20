import { ActivityFormat } from '../../Activity/types'

export interface TravelElementGloballyFormat {
  id: number
  activity: ActivityFormat
  numberOfPeople: number
  price: number
  description: string
  from: number
  to: number
}

export interface TravelElementLocallyFormat {
  id: number
  activity: ActivityFormat
  numberOfPeople: number
  price: number
  description: string
  dayCount: number
  from: Date
  to: Date
}
