import React from 'react'
import { Activity as ActivityEntity } from '../../../../model'
import * as Travel from './Travel'
import * as Attraction from './Attraction'
import * as Restaurant from './Restaurant'

type Props = {
  activity: ActivityEntity
  state: { travelRecipe: boolean, countDay: string, travelInstance: string, date: string }
}

const ActivityCard: React.FC<Props> = (props) => {
  switch (props.activity.activityType) {
    case 'Podróż':
      return (
        <Travel.Component
          activity={props.activity}
          state={props.state}
        />
      )
    case 'Atrakcja':
      return (
        <Attraction.Component
          activity={props.activity}
          state={props.state}
        />
      )
    case 'Restauracja':
      return (
        <Restaurant.Component
          activity={props.activity}
          state={props.state}
        />
      )
    default:
      return <> </>
  }
}

export default ActivityCard
