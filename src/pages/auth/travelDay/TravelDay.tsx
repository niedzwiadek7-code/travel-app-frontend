import React from 'react'
import {
  Stack, Button,
} from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { Pages } from '../../../pages/pages'
import * as TravelDayTable from './TravelDayTable'
import { useAppSelector } from '../../../app/hooks'
import { RootState } from '../../../app/store'
import AddActivityButton from './AddActivityButton'

const TravelDay: React.FC = () => {
  const travelRecipe = useAppSelector((state: RootState) => state.travelRecipe)
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
          onClick={() => {
            if (travelRecipe.id) {
              navigate(Pages.EDIT_TRAVEL.getRedirectLink({
                id: travelRecipe.id.toString(),
              }))
            } else {
              navigate(Pages.CREATE_TRAVEL.getRedirectLink())
            }
          }}
        >
          Powrót
        </Button>

        <AddActivityButton
          countDay={countDay}
        />
      </Stack>
    </Stack>
  )
}

export default TravelDay
