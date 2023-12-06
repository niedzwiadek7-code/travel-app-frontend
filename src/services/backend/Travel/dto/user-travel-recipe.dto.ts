interface Element {
  price: number
  activityType: string
  name: string
}

interface AccommodationElement {
  price: number
  name: number
}

export interface UserTravelRecipeDto {
  id: number
  name: string
  countDays: number
  elements: Element[]
  accommodations: AccommodationElement[]
}
