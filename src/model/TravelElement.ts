import Activity from './Activity'
import Date from './Date'

class TravelElement {
  id: string

  dayCount: number

  from: Date

  to: Date

  activity: Activity

  price: number

  constructor(obj: any) {
    this.id = obj.id
    this.dayCount = obj.dayCount
    this.from = obj.from
    this.to = obj.to
    this.activity = obj.activity
    this.price = obj.price
  }
}

export default TravelElement
