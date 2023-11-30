import React from 'react'
import { Stack, useTheme } from '@mui/material'
import * as SaveActivityModal from '../../../../../components/SaveActivityModal'
import { Activity as ActivityEntity } from '../../../../../model'

type Props = {
  activity: ActivityEntity
  countDay: string
}

const Travel: React.FC<Props> = (props) => {
  const theme = useTheme()

  const formatter = Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'PLN',
  })

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
          { `${props.activity.from} - ${props.activity.to}` }
        </div>
        <div>
          {formatter.format(props.activity.price)}
        </div>
      </Stack>
      <hr
        style={{ backgroundColor: theme.palette.grey['900'], height: '1px', width: '100%' }}
      />
      <Stack
        gap={2}
      >
        <Stack>
          { props.activity.description }
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

export default Travel
