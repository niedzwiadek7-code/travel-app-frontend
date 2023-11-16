type Activity = {
  id: number,
  name: string
}

class TravelElement {
  id: number

  dayCount: number

  from: Date

  to: Date

  activity: Activity

  constructor(obj: any) {
    this.id = obj.id
    this.dayCount = obj.dayCount
    this.from = obj.from
    this.to = obj.to
    this.activity = obj.activity
  }
}

export default TravelElement
