import { DateType } from '../../../../utils/Date'

export interface TravelElementGloballyDto {
    from: number
    to: number
}

export interface TravelElementLocallyDto {
    dayCount: number
    from: DateType
    to: DateType
}

export interface TravelElementDto {
    activityId: number
    price: number
    numberOfPeople: number
    description: string
    travelElementGlobally?: TravelElementGloballyDto
    travelElementLocally?: TravelElementLocallyDto
}

export interface TravelDto {
  name: string
  countDays: number
  travelElements: TravelElementDto[]
}
