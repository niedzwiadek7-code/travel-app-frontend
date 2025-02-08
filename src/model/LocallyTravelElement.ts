import Activity from './Activity'
import { DateType } from '../utils/Date'

class LocallyTravelElement {
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
    const transformHour = (hour: string) => {
      const [hours, minutes] = hour.split(':')
      return `${hours}:${minutes}`
    }

    this.id = obj.id
    this.dayCount = obj.dayCount
    this.from = transformHour(obj.from)
    this.to = transformHour(obj.to)
    this.activity = obj.activity
    this.numberOfPeople = obj.numberOfPeople
    this.price = obj.price
    this.description = obj.description
    this.photos = obj.photos
  }
}

export default LocallyTravelElement
