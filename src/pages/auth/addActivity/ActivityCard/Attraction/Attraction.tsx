import React from 'react'
import { Stack, useTheme } from '@mui/material'
import { Activity as ActivityEntity } from '../../../../../model'
import * as SaveActivityModal from '../../../../../components/SaveActivityModal'
import * as SaveInstanceActivityModal from '../../../../../components/SaveInstanceActivityModal'

type Props = {
  activity: ActivityEntity
  state: { travelRecipe: boolean, countDay: string, travelInstance: string, date: string }
}

const Attraction: React.FC<Props> = (props) => {
  const theme = useTheme()

  const formatter = Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'PLN',
  })

  const getPriceTypeWord = (type: string) => {
    switch (type) {
      case 'per_entry':
        return 'wejście'
      case 'per_hour':
        return 'godzina'
      default:
        return ''
    }
  }

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
          { formatter.format(props.activity.price) } /
          {getPriceTypeWord(props.activity.priceType)}
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
          {
            props.state?.travelRecipe ? (
              <SaveActivityModal.Component
                activity={props.activity}
                countDay={props.state.countDay}
              />
            ) : (
              <SaveInstanceActivityModal.Component
                activity={props.activity}
                date={props.state.date}
              />
            )
          }

        </Stack>
      </Stack>
    </Stack>
  )
}

export default Attraction
