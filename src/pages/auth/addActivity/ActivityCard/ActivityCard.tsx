import React from 'react'
import { Activity as ActivityEntity } from '../../../../model'
import * as Travel from './Travel'
import * as Accommodation from './Accommodation'
import * as Attraction from './Attraction'
import * as Restaurant from './Restaurant'

type Props = {
  activity: ActivityEntity
  countDay: string
}

const ActivityCard: React.FC<Props> = (props) => {
  switch (props.activity.activityType) {
    case 'Podróż':
      return (
        <Travel.Component
          activity={props.activity}
          countDay={props.countDay}
        />
      )
    case 'Nocleg':
      return (
        <Accommodation.Component
          activity={props.activity}
          countDay={props.countDay}
        />
      )
    case 'Atrakcja':
      return (
        <Attraction.Component
          activity={props.activity}
          countDay={props.countDay}
        />
      )
    case 'Restauracja':
      return (
        <Restaurant.Component
          activity={props.activity}
          countDay={props.countDay}
        />
      )
    default:
      return <> </>
  }
}

export default ActivityCard
