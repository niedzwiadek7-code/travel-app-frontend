import { Stack, Typography } from '@mui/material'
import React from 'react'
import { ActivityType } from '../../../../model'
import * as GloballyElem from '../GloballyElem'
import AddActivityButton from './AddActivityButton'
import { useAppSelector } from '../../../../app/hooks'
import { RootState } from '../../../../app/store'

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
    <Stack
      gap={1}
    >
      <Typography variant="h5" component="h5">
        {props.title}
      </Typography>

      {
        travelElements.map((elem) => (
          <GloballyElem.Component
            key={elem.id.toString()}
            elem={elem}
          />
        ))
      }

      <AddActivityButton
        activityType={props.activityType}
      />
    </Stack>
  )
}

export default ActivitySection
