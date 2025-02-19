import React from 'react'
import {
  ArrowBack,
} from '@mui/icons-material'
import {
  Box,
  Button,
  Stack,
  Typography,
  useTheme,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useDependencies, useAuth } from '../../../context'
import * as Loading from '../../../components/UI/Loading'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { RootState } from '../../../app/store'
import { setNewTravelInstance } from '../../../features/travelInstance/travelInstanceSlice'
import * as UnexpectedError from '../../../components/UI/UnexpectedError'
import { Pages } from '../../pages'
import * as TripTable from './TripTable'
import * as GloballySection from './GloballySection'
import { useFetch, useRouter } from '../../../hooks'
import { TravelInstance } from '../../../model'
import * as Collapse from '../../../components/UI/Collapse'

type Params = {
  id: string;
};

const TakingTrip: React.FC = () => {
  const {
    params: { id },
    navigate,
  } = useRouter<Record<string, any>, Record<string, any>, Params>()

  const { getApiService } = useDependencies()
  const apiService = getApiService()
  const { token } = useAuth()
  const travelService = apiService.getTravel(token)
  const { t } = useTranslation('translation', { keyPrefix: 'taking_trip_page' })

  const travelInstance = useAppSelector((state: RootState) => state.travelInstance)
  const dispatch = useAppDispatch()
  const theme = useTheme()

  const fetchData = async (): Promise<TravelInstance> => {
    const travelInstanceTemp = await travelService.getTravelInstance(id)
    dispatch(setNewTravelInstance(travelInstanceTemp))
    return travelInstanceTemp
  }

  const { loading } = useFetch<TravelInstance>({
    fetchData,
    defaultData: undefined,
  })

  if (!id) {
    return <UnexpectedError.Component />
  }

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
      {/* Back Button */}
      <Stack
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
        flexDirection="row"
        sx={{ width: '100%' }}
      >
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate(Pages.REALIZED_TRIPS.getRedirectLink())}
        >
          {t('back')}
        </Button>
      </Stack>

      {/* Title Section */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 1,
        }}
      >
        <Typography variant="h4">
          {travelInstance.travelRecipe.name}
        </Typography>
      </Box>

      <GloballySection.Component
        title={t('accommodations')}
        activityType="Accommodation"
      />

      <Collapse.Component
        title={t('browse_trip')}
        defaultOpen
      >
        <TripTable.Component />
      </Collapse.Component>
    </Stack>
  )
}

export default TakingTrip
