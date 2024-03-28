import {
  AirplanemodeActive, Attractions, Hotel, Restaurant, SvgIconComponent,
} from '@mui/icons-material'

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

export const getActivityTypeIcon = (activityType: ActivityType): SvgIconComponent => {
  switch (activityType) {
    case 'Attraction':
      return Attractions
    case 'Restaurant':
      return Restaurant
    case 'Accommodation':
      return Hotel
    case 'Trip':
    default:
      return AirplanemodeActive
  }
}
