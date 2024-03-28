import { ActivityFormat } from '../../Activity/types'
import {
  TravelElementLocallyFormat,
  TravelElementGloballyFormat,
} from './travel-element-format'

export interface TravelInstanceElementFormat {
  id: number
  passed: boolean
  from: string
  to: string
  activity: ActivityFormat
  elementTravel?: TravelElementLocallyFormat | TravelElementGloballyFormat
}

export interface TravelInstanceRecipeFormat {
  id: number
  name: string
  countDays: number
}

export interface TravelInstanceFormat {
  id: number
  from: string
  to: string
  travelElements: TravelInstanceElementFormat[]
  travelRecipe: TravelInstanceRecipeFormat
}
