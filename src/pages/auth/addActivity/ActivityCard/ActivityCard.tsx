import React from 'react'
import { Activity as ActivityEntity } from '../../../../model'
import * as Travel from './Travel'
import * as Attraction from './Attraction'
import * as Restaurant from './Restaurant'
import { StateDto } from '../dto/state.dto'

type Props = {
  activity: ActivityEntity
  state: StateDto
  acceptElement: () => any
  deleteElement: () => any
}

const ActivityCard: React.FC<Props> = (props) => {
  switch (props.activity.activityType) {
    case 'Podróż':
      return (
        <Travel.Component
          activity={props.activity}
          state={props.state}
          acceptElement={props.acceptElement}
          deleteElement={props.deleteElement}
        />
      )
    case 'Atrakcja':
      return (
        <Attraction.Component
          activity={props.activity}
          state={props.state}
          acceptElement={props.acceptElement}
          deleteElement={props.deleteElement}
        />
      )
    case 'Restauracja':
      return (
        <Restaurant.Component
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
