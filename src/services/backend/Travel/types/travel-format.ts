import { TravelElementGloballyFormat, TravelElementLocallyFormat } from './travel-element-format'

export interface TravelFormat {
  id: number
  name: string
  countDays: number
  travelElementsLocally: TravelElementLocallyFormat[]
  travelElementsGlobally: TravelElementGloballyFormat[]
}
