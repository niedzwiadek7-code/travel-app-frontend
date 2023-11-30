import React from 'react'
import { Activity } from '../../../../model'
import * as SaveActivityModal from '../../../../components/SaveActivityModal'

type Props = {
  activity: Activity,
  countDay: string
}

const SaveActivityModalComponent: React.FC<Props> = (props) => {
  switch (props.activity.activityType) {
    case 'Restauracja':
      return (
        <SaveActivityModal.Restaurant.Component
          activity={props.activity}
          countDay={props.countDay}
        />
      )
    case 'Nocleg':
      return (
        <SaveActivityModal.Accommodation.Component
          activity={props.activity}
          countDay={props.countDay}
        />
      )
    case 'Podróż':
      return (
        <SaveActivityModal.Travel.Component
          activity={props.activity}
          countDay={props.countDay}
        />
      )
    case 'Atrakcja':
      return (
        <SaveActivityModal.Attraction.Component
          activity={props.activity}
          countDay={props.countDay}
        />
      )
    default:
      return <> </>
  }
}

export default SaveActivityModalComponent
