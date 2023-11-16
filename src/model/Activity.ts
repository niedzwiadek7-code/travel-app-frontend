class Activity {
  id: number

  accepted: boolean

  name: string

  description: string

  activityType: string

  customParameters: Record<string, string>

  constructor(obj: any) {
    this.id = obj.id
    this.accepted = obj.accepted
    this.name = obj.name
    this.description = obj.description
    this.activityType = obj.activityType
    this.customParameters = obj.customParameters
  }
}

export default Activity
