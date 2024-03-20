import React, { useEffect, useState } from 'react'
import { Button, Stack } from '@mui/material'
import { ReceiptLong } from '@mui/icons-material'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'
import * as Header from '../../../components/Header'
import { TravelInstance } from '../../../model'
import * as Loading from '../../../components/UI/Loading'
import { useDependencies, useAuth } from '../../../context'
import * as TripCard from './TripCard'
import { Pages } from '../../pages'

const RealizedTrips: React.FC = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(true)
  const [travelInstances, setTravelInstances] = useState<TravelInstance[]>([])

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
        'Wystąpił nieoczekiwany błąd',
      )
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const travelInstancesTemp = (await travelService.getAllTravelInstances()).sort(
          (a, b) => dayjs(a.from).diff(b.from),
        )
        setTravelInstances(travelInstancesTemp)
        setLoading(false)
      } catch (err) {
        setLoading(false)
        toastUtils.Toast.showToast(
          toastUtils.types.ERROR,
          'Wystąpił nieoczekiwany błąd',
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
        title="Lista wycieczek"
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
        onClick={() => navigate(Pages.DASHBOARD.getRedirectLink())}
      >
        Powrót do strony głównej
      </Button>

    </Stack>
  )
}

export default RealizedTrips
