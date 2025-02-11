import React, { useEffect, useState } from 'react'
import { Button, Stack } from '@mui/material'
import { ReceiptLong } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import * as Header from '../../../components/Header'
import { TravelInstance } from '../../../model'
import * as Loading from '../../../components/UI/Loading'
import { useDependencies, useAuth } from '../../../context'
import * as TripCard from './TripCard'
import { Pages } from '../../pages'
import { DateHandler } from '../../../utils/Date'

const RealizedTrips: React.FC = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(true)
  const [travelInstances, setTravelInstances] = useState<TravelInstance[]>([])
  const { t } = useTranslation('translation', { keyPrefix: 'realized_trips_page' })

  const { getApiService, getToastUtils } = useDependencies()
  const apiService = getApiService()
  const toastUtils = getToastUtils()
  const { token } = useAuth()
  const travelService = apiService.getTravel(token)

  const deleteTravelInstance = async (id: string) => {
    try {
      await travelService.deleteInstance(id)
      const travelInstancesTemp = travelInstances.filter((elem) => elem.id.toString() !== id)
      setTravelInstances(travelInstancesTemp)
    } catch (err) {
      toastUtils.Toast.showToast(
        toastUtils.types.ERROR,
        t('error'),
      )
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const travelInstancesTemp = (await travelService.getAllTravelInstances()).sort(
          (a, b) => DateHandler.compareDates(b.from, a.from),
        )
        setTravelInstances(travelInstancesTemp)
        setLoading(false)
      } catch (err) {
        setLoading(false)
        toastUtils.Toast.showToast(
          toastUtils.types.ERROR,
          t('error'),
        )
      }
    }
    fetchData()
  }, [])

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
        title={t('title')}
        icon={(
          <ReceiptLong
            fontSize="large"
          />
        )}
      />

      {
        travelInstances.map((travelInstance) => (
          <TripCard.Component
            key={travelInstance.id}
            travelInstance={travelInstance}
            deleteTravelInstance={() => deleteTravelInstance(travelInstance.id.toString())}
          />
        ))
      }

      <Button
        type="button"
        variant="outlined"
        onClick={() => navigate(Pages.TRAVEL_RECIPES_STORE.getRedirectLink())}
      >
        {t('back')}
      </Button>

    </Stack>
  )
}

export default RealizedTrips
