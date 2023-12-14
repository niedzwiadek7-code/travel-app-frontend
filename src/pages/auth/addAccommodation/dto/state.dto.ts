import type { QueryActivity } from '../../../../services/backend/Activity/dto'

export type StateDto = {
  travelRecipe: boolean,
  travelInstance: string,
  admin: boolean
  source: QueryActivity
}
