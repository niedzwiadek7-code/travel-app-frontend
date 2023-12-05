import React from 'react'
import { Stack, useTheme } from '@mui/material'
import { Accommodation as AccommodationEntity } from '../../../../model'
import * as SaveActivityModal from '../../../../components/SaveActivityModal'

type Props = {
  accommodation: AccommodationEntity
  countDay: string
}

const Accommodation: React.FC<Props> = (props) => {
  const theme = useTheme()

  const formatter = Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'PLN',
  })

  return (
    <Stack
      key={props.accommodation.id}
      gap={1}
      style={{ padding: '.8em', backgroundColor: theme.palette.grey['200'], borderRadius: '.8em' }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <div> {props.accommodation.name} </div>
        <div>
          { props.accommodation.place }
        </div>
        <div>
          { formatter.format(props.accommodation.price) } / dzień
        </div>
      </Stack>
      <hr
        style={{ backgroundColor: theme.palette.grey['900'], height: '1px', width: '100%' }}
      />
      <Stack
        gap={2}
      >
        <Stack>
          {props.accommodation.description}
        </Stack>
        <Stack>
          <SaveActivityModal.Component
            activity={props.accommodation}
            countDay={props.countDay}
          />
        </Stack>
      </Stack>
    </Stack>
  )
}

export default Accommodation
