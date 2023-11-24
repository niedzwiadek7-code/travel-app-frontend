import React from 'react'
import {
  Stack, Button,
} from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { Pages } from '../../../pages/pages'
import * as TravelDayTable from './TravelDayTable'

const TravelDay: React.FC = () => {
  const { countDay } = useParams()
  const navigate = useNavigate()

  if (!countDay) {
    return (
      <div>
        Wystąpił nieoczikwany problem
      </div>
    )
  }

  return (
    <Stack>
      <h2>
        Dzień {countDay}
      </h2>

      <TravelDayTable.Component
        countDay={parseInt(countDay, 10)}
      />

      <Stack
        direction="row"
        justifyContent="flex-end"
        gap={1}
        style={{ marginTop: '1em' }}
      >
        <Button
          type="button"
          variant="outlined"
          onClick={() => navigate(Pages.CREATE_TRAVEL.getRedirectLink())}
        >
          Powrót
        </Button>

        <Button
          type="button"
          variant="contained"
          onClick={() => navigate(Pages.ADD_ACTIVITY.getRedirectLink({
            countDay,
          }))}
        >
          Dodaj aktywność
        </Button>
      </Stack>
    </Stack>
  )
}

export default TravelDay
