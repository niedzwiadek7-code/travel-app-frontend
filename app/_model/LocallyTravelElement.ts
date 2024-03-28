import { Activity } from '.'
import { DateType } from '@/app/_utils/Date'

export class LocallyTravelElement {
  id: string

  dayCount: number

  from: DateType

  to: DateType

  activity: Activity

  price: number

  numberOfPeople: number

  description: string

  photos: string[]

  constructor(obj: any) {
    this.id = obj.id
    this.dayCount = obj.dayCount
    this.from = obj.from
    this.to = obj.to
    this.activity = obj.activity
    this.numberOfPeople = obj.numberOfPeople
    this.price = obj.price
    this.description = obj.description
    this.photos = obj.photos
  }
}
