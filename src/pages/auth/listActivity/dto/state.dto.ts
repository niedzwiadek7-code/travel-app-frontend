import type { QueryActivityDto } from '../../../../services/backend/Activity/dto'
import type { ActivityType } from '../../../../model'

export type StateDto = {
  travelRecipe: boolean,
  countDay: string,
  travelInstance: string,
  date: string,
  admin: boolean
  source: QueryActivityDto,
  types: ActivityType[],
}
