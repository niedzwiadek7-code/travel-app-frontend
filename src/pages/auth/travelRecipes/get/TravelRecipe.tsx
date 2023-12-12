import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Stack } from '@mui/material'
import { ReceiptLong } from '@mui/icons-material'
import * as UnexpectedError from '../../../../components/UI/UnexpectedError'
import * as Header from '../../../../components/Header'
import { useDependencies } from '../../../../context/dependencies'
import { useAuth } from '../../../../context/auth'
import { useAppDispatch, useAppSelector } from '../../../../app/hooks'
import { RootState } from '../../../../app/store'
import { setNewTravelRecipe } from '../../../../features/travelRecipe/travelRecipeSlice'
import * as Loading from '../../../../components/UI/Loading'
import * as AccommodationTable from './AccommodationTable'
import * as TravelDayTable from './TravelDayTable'
import { Pages } from '../../../pages'
import * as SignUpForTrip from '../../../../components/SignUpForTrip'

const TravelRecipe: React.FC = () => {
  const { id } = useParams()
  const { getApiService } = useDependencies()
  const apiService = getApiService()
  const { token } = useAuth()
  const travelService = apiService.getTravel(token)
  const [loading, setLoading] = useState<boolean>(true)
  const travelRecipe = useAppSelector((state: RootState) => state.travelRecipe)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        setLoading(true)
        if (travelRecipe.id === parseInt(id, 10)) {
          setLoading(false)
        }
        const travelRecipeTemp = await travelService.get(id)
        dispatch(setNewTravelRecipe(travelRecipeTemp))
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (!id) {
    return (
      <UnexpectedError.Component />
    )
  }

  if (loading) {
    return (
      <Loading.Component />
    )
  }

  return (
    <Stack
      gap={2}
    >
      <Header.Component
        title={travelRecipe.name}
        icon={(
          <ReceiptLong
            fontSize="large"
          />
        )}
      />

      <Stack>
        <h2
          style={{ marginTop: 0 }}
        >
          Noclegi
        </h2>

        <AccommodationTable.Component />
      </Stack>

      <Stack>
        <h2
          style={{ marginTop: 0, marginBottom: 0 }}
        >
          Rozkład dni
        </h2>

        <Stack
          gap={2}
        >
          {
            Array.apply(0, Array(travelRecipe.countDays)).map((x, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <Stack key={i}>
                <h3
                  style={{ marginTop: '1' }}
                >
                  Dzień {i + 1}
                </h3>

                <TravelDayTable.Component
                  countDay={i + 1}
                />
              </Stack>
            ))
          }
        </Stack>
      </Stack>

      <SignUpForTrip.Component
        id={travelRecipe.id.toString()}
        name={travelRecipe.name}
      />

      <Button
        type="button"
        variant="outlined"
        onClick={() => navigate(Pages.TRAVEL_RECIPES_STORE.getRedirectLink())}
      >
        Powrót do listy wycieczek
      </Button>
    </Stack>
  )
}

export default TravelRecipe
