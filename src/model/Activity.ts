class Activity {
  id: number

  accepted: boolean

  name: string

  description: string

  activityType: string

  customParameters: Record<string, string>

  price: number

  constructor(obj: any) {
    this.id = obj.id
    this.accepted = obj.accepted
    this.name = obj.name
    this.description = obj.description
    this.activityType = obj.activityType
    this.customParameters = obj.customParameters
    this.price = obj.number
  }
}

export default Activity
