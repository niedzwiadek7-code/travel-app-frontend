import React from 'react'
import {
  Stack, Button,
} from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { Today } from '@mui/icons-material'
import { Pages } from '../../../pages/pages'
import * as TravelDayTable from './TravelDayTable'
import { useAppSelector } from '../../../app/hooks'
import { RootState } from '../../../app/store'
import AddActivityButton from './AddActivityButton'
import * as Header from '../../../components/Header'
import * as UnexpectedError from '../../../components/UI/UnexpectedError'

const TravelDay: React.FC = () => {
  const travelRecipe = useAppSelector((state: RootState) => state.travelRecipe)
  const { countDay } = useParams()
  const navigate = useNavigate()

  if (!countDay) {
    return (
      <UnexpectedError.Component />
    )
  }

  return (
    <Stack
      gap={2}
    >
      <Header.Component
        title={`Dzień ${countDay}`}
        icon={(
          <Today
            fontSize="large"
          />
        )}
      />

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
