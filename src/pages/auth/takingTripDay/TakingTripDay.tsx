import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Stack } from '@mui/material'
import { Map } from '@mui/icons-material'
import dayjs from 'dayjs'
import { useAppSelector } from '../../../app/hooks'
import { RootState } from '../../../app/store'
import * as Header from '../../../components/Header'
import { Pages } from '../../pages'
import * as UnexpectedError from '../../../components/UI/UnexpectedError'
import * as TripDayElem from './TripDayElem'
import AddActivityButton from './AddActivityButton'
import { ActivityType } from '../../../model'

const TakingTripDay: React.FC = () => {
  const travelInstance = useAppSelector((state: RootState) => state.travelInstance)
  const { date } = useParams()
  const navigate = useNavigate()

  if (!date) {
    return (
      <UnexpectedError.Component />
    )
  }

  const locallyActivityTypes: ActivityType[] = ['Attraction', 'Trip', 'Restaurant']

  const travelElements = travelInstance.travelElements
    .filter((elem) => locallyActivityTypes.includes(elem.activity.activityType))
    .filter((elem) => {
      const dateStr = dayjs(elem.from).format('YYYY-MM-DD')
      return dateStr === date
    }).sort((a, b) => {
      if (a.passed && !b.passed) {
        return 1
      }
      if (!a.passed && b.passed) {
        return -1
      }
      return dayjs(a.from).diff(b.from)
    })

  return (
    <Stack
      gap={2}
    >
      <Header.Component
        title={`${travelInstance.travelRecipe.name} - ${date}`}
        icon={(
          <Map
            fontSize="large"
          />
        )}
      />

      <Stack
        gap={2}
      >
        {
          travelElements.map((elem) => (
            <TripDayElem.Component
              key={elem.id}
              travelElement={elem}
            />
          ))
        }
      </Stack>

      <AddActivityButton
        travelInstanceId={travelInstance.id.toString()}
        date={date}
      />

      <Button
        type="button"
        variant="outlined"
        onClick={() => navigate(Pages.TAKING_TRIP.getRedirectLink({
          id: travelInstance.id.toString(),
        }))}
      >
        Powrót do widoku wycieczki
      </Button>
    </Stack>
  )
}

export default TakingTripDay
