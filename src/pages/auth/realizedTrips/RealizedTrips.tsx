import React, { useEffect, useState } from 'react'
import {
  Button,
  Stack,
  Typography,
  useTheme,
  styled,
  Box,
  alpha,
} from '@mui/material'
import { ReceiptLong } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { TravelInstance } from '../../../model'
import * as Loading from '../../../components/UI/Loading'
import { useDependencies, useAuth } from '../../../context'
import * as TripCard from './TripCard'
import { DateHandler } from '../../../utils/Date'

const RealizedTrips: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [travelInstances, setTravelInstances] = useState<TravelInstance[]>([])
  const { t } = useTranslation('translation', { keyPrefix: 'realized_trips_page' })
  const theme = useTheme()

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
      toastUtils.Toast.showToast(
        toastUtils.types.SUCCESS,
        t('delete_success'),
      )
    } catch (err) {
      toastUtils.Toast.showToast(
        toastUtils.types.ERROR,
        t('delete_error'),
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
      } catch (err) {
        toastUtils.Toast.showToast(
          toastUtils.types.ERROR,
          t('error'),
        )
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) {
    return <Loading.Component />
  }

  return (
    <Stack
      gap={3}
      sx={{
        padding: theme.spacing(3),
        borderRadius: '12px',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[1],
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: theme.shadows[3],
        },
      }}
    >
      <Typography variant="h4" fontWeight={700} color="text.primary">
        {t('your_trips')}
      </Typography>

      {travelInstances.length > 0 ? (
        <Stack gap={2}>
          {travelInstances.map((travelInstance) => (
            <TripCard.Component
              key={travelInstance.id}
              travelInstance={travelInstance}
              deleteTravelInstance={() => deleteTravelInstance(travelInstance.id.toString())}
            />
          ))}
        </Stack>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            padding: theme.spacing(4),
            backgroundColor: alpha(theme.palette.primary.main, 0.05),
            borderRadius: '12px',
          }}
        >
          <ReceiptLong fontSize="large" color="primary" />
          <Typography variant="body1" color="text.secondary" textAlign="center">
            {t('no_trips_found')}
          </Typography>
        </Box>
      )}

    </Stack>
  )
}

export default RealizedTrips
