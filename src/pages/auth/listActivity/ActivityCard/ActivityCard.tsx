import React from 'react'
import * as Travel from './Travel'
import * as Attraction from './Attraction'
import * as Restaurant from './Restaurant'
import * as Accommodation from './Accommodation'
import { StateDto } from '../dto/state.dto'
import { ExtendedActivityFormat } from '../../../../services/backend/Activity/types'

type Props = {
  activity: ExtendedActivityFormat
  state: StateDto
  acceptElement: () => any
  deleteElement: () => any
}

const ActivityCard: React.FC<Props> = (props) => {
  switch (props.activity.activityType) {
    case 'Trip':
      return (
        <Travel.Component
          activity={props.activity}
          state={props.state}
          acceptElement={props.acceptElement}
          deleteElement={props.deleteElement}
        />
      )
    case 'Attraction':
      return (
        <Attraction.Component
          activity={props.activity}
          state={props.state}
          acceptElement={props.acceptElement}
          deleteElement={props.deleteElement}
        />
      )
    case 'Restaurant':
      return (
        <Restaurant.Component
          activity={props.activity}
          state={props.state}
          acceptElement={props.acceptElement}
          deleteElement={props.deleteElement}
        />
      )
    case 'Accommodation':
      return (
        <Accommodation.Component
          activity={props.activity}
          state={props.state}
          acceptElement={props.acceptElement}
          deleteElement={props.deleteElement}
        />
      )
    default:
      return <> </>
  }
}

export default ActivityCard
