import React from 'react'
import { Stack, useTheme } from '@mui/material'
import { Activity as ActivityEntity } from '../../../../../model'
import * as SaveActivityModal from '../../../../../components/SaveActivityModal'

type Props = {
  activity: ActivityEntity
  countDay: string
}

const Restaurant: React.FC<Props> = (props) => {
  const theme = useTheme()

  return (
    <Stack
      key={props.activity.id}
      gap={1}
      style={{ padding: '.8em', backgroundColor: theme.palette.grey['200'], borderRadius: '.8em' }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <div> {props.activity.name} </div>
        <div>
          { props.activity.place }
        </div>
        <div>
          Cena definiowana ręcznie
        </div>
      </Stack>
      <hr
        style={{ backgroundColor: theme.palette.grey['900'], height: '1px', width: '100%' }}
      />
      <Stack
        gap={2}
      >
        <Stack>
          {props.activity.description}
        </Stack>
        <Stack>
          <SaveActivityModal.Component
            activity={props.activity}
            countDay={props.countDay}
          />
        </Stack>
      </Stack>
    </Stack>
  )
}

export default Restaurant
