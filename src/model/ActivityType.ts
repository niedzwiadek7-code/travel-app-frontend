export type ActivityType = 'Attraction' | 'Restaurant' | 'Accommodation' | 'Trip'

export type ActivityScope = 'Locally' | 'Globally'

export const locallyActivityTypes: ActivityType[] = [
  'Attraction',
  'Restaurant',
  'Trip',
]

export const globallyActivityTypes: ActivityType[] = [
  'Accommodation',
]
