import React from 'react'
import { ActivityType } from '../../../../model'
import * as GloballyElem from '../GloballyElem'
import AddActivityButton from './AddActivityButton'
import { useAppSelector } from '../../../../app/hooks'
import { RootState } from '../../../../app/store'
import * as Collapse from '../../../../components/UI/Collapse'

type Props = {
  title: string
  activityType: ActivityType
}

const ActivitySection: React.FC<Props> = (props) => {
  const travelInstance = useAppSelector((state: RootState) => state.travelInstance)
  const travelElements = travelInstance.travelElements
    .filter((e) => e.activity.activityType === props.activityType)
    .sort((a, b) => {
      if (a.passed && !b.passed) {
        return 1
      }
      return -1
    })

  return (
    <Collapse.Component
      title={props.title}
      nodeOptions={[
        <AddActivityButton
          key={0}
          activityType={props.activityType}
        />,
      ]}
    >
      {
        travelElements.map((elem) => (
          <GloballyElem.Component
            key={elem.id.toString()}
            elem={elem}
          />
        ))
      }
    </Collapse.Component>
  )
}

export default ActivitySection
