interface Element {
  price: number
  activityType: string
  name: string
}

interface AccommodationElement {
  price: number
  name: number
}

export interface UserTravelRecipe {
  id: number
  name: string
  countDays: number
  elements: Element[]
  accommodations: AccommodationElement[]
}
