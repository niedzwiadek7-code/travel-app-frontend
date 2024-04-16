import React from 'react'
import { Map } from '@mui/icons-material'
import { Button, Stack, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
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
import { useFetch, useRouter } from '../../../hooks'
import { TravelInstance } from '../../../model'

type Params = {
  id: string
}

const TakingTrip: React.FC = () => {
  const {
    params: { id },
    navigate,
  } = useRouter<
    Record<string, any>,
    Record<string, any>,
    Params
  >()

  const { getApiService } = useDependencies()
  const apiService = getApiService()
  const { token } = useAuth()
  const travelService = apiService.getTravel(token)
  const { t } = useTranslation('translation', { keyPrefix: 'taking_trip_page' })

  const travelInstance = useAppSelector((state: RootState) => state.travelInstance)
  const dispatch = useAppDispatch()

  const fetchData = async (): Promise<TravelInstance> => {
    const travelInstanceTemp = await travelService.getTravelInstance(id)
    dispatch(setNewTravelInstance(travelInstanceTemp))
    return travelInstanceTemp
  }

  const {
    loading,
  } = useFetch<TravelInstance>({
    fetchData,
    defaultData: undefined,
  })

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
        title={t('accommodations')}
        activityType="Accommodation"
      />

      <Stack>
        <Typography variant="h5" component="h5">
          {t('browse_trip')}
        </Typography>

        <TripTable.Component />
      </Stack>

      <Button
        type="button"
        variant="outlined"
        onClick={() => navigate(Pages.REALIZED_TRIPS.getRedirectLink())}
      >
        {t('back_to_realized_trips')}
      </Button>
    </Stack>
  )
}

export default TakingTrip
