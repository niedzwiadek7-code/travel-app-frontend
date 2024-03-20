import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Map } from '@mui/icons-material'
import { Button, Stack, Typography } from '@mui/material'
import { useDependencies, useAuth } from '../../../context'
import * as Loading from '../../../components/UI/Loading'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { RootState } from '../../../app/store'
import { setNewTravelInstance } from '../../../features/travelInstance/travelInstanceSlice'
import * as UnexpectedError from '../../../components/UI/UnexpectedError'
import * as Header from '../../../components/Header'
import { Pages } from '../../pages'
import * as TripTable from './TripTable'
import * as GloballySection from './GloballySection'

const TakingTrip: React.FC = () => {
  const { id } = useParams()
  const { getApiService } = useDependencies()
  const apiService = getApiService()
  const { token } = useAuth()
  const travelService = apiService.getTravel(token)
  const [loading, setLoading] = useState<boolean>(true)
  const navigate = useNavigate()

  const travelInstance = useAppSelector((state: RootState) => state.travelInstance)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        setLoading(true)
        if (travelInstance.id === parseInt(id, 10)) {
          setLoading(false)
          return
        }
        const travelInstanceTemp = await travelService.getTravelInstance(id)
        dispatch(setNewTravelInstance(travelInstanceTemp))
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
        title={travelInstance.travelRecipe.name}
        icon={(
          <Map
            fontSize="large"
          />
        )}
      />

      <GloballySection.Component
        title="Dodaj nocleg"
        activityType="Accommodation"
      />

      <Stack>
        <Typography variant="h5" component="h5">
          Przeglądaj wycieczkę
        </Typography>

        <TripTable.Component />
      </Stack>

      <Button
        type="button"
        variant="outlined"
        onClick={() => navigate(Pages.REALIZED_TRIPS.getRedirectLink())}
      >
        Powrót do listy realizowanych wycieczek
      </Button>
    </Stack>
  )
}

export default TakingTrip
