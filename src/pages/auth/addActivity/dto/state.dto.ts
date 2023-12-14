import type { QueryActivity } from '../../../../services/backend/Activity/dto'

export type StateDto = {
  travelRecipe: boolean,
  countDay: string,
  travelInstance: string,
  date: string,
  admin: boolean
  source: QueryActivity
}
