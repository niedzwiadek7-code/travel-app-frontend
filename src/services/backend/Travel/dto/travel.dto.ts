// TODO: remove DateDto
export interface DateDto {
    hour: number
    minute: number
}

export interface TravelElementGloballyDto {
    from: number
    to: number
}

export interface TravelElementLocallyDto {
    dayCount: number
    from: DateDto
    to: DateDto
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
