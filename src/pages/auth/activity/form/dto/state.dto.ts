import { ActivityType } from '../../../../../model/ActivityType'

export type StateDto = {
  travelRecipe: boolean,
  travelInstance: string,
  countDay: string,
  date: string,
  admin: boolean,
  availableTypes: ActivityType[],
}
