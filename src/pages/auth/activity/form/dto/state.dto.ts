import { ActivityType } from '../../../../../model'

export type StateDto = {
  travelRecipe: boolean,
  travelInstance: string,
  countDay: string,
  date: string,
  admin: boolean,
  availableTypes: ActivityType[],
  previousPage: string,
}
