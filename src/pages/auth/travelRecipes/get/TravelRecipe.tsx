import React from 'react'
import {
  Button,
  Stack,
  Typography,
  useTheme,
  styled,
  Box,
  Paper, IconButton, Tooltip,
} from '@mui/material'
import {
  ArrowBack,
  Done, EventAvailable, ReceiptLong, Share,
} from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import * as UnexpectedError from '../../../../components/UI/UnexpectedError'
import { useDependencies, useAuth } from '../../../../context'
import { useAppDispatch, useAppSelector } from '../../../../app/hooks'
import { RootState } from '../../../../app/store'
import { setNewTravelRecipe } from '../../../../features/travelRecipe/travelRecipeSlice'
import * as Loading from '../../../../components/UI/Loading'
import * as AccommodationTable from './AccommodationTable'
import * as TravelDayTable from './TravelDayTable'
import { Pages } from '../../../pages'
import * as SignUpForTrip from '../../../../components/SignUpForTrip'
import * as CopyToClipboard from '../../../../components/UI/CopyToClipboard'
import { useFetch, useRouter } from '../../../../hooks'
import { TravelRecipe } from '../../../../model'

type Params = {
  id: string;
};

const TravelRecipeComponent: React.FC = () => {
  const {
    params: { id },
    navigate,
  } = useRouter<Record<string, any>, Record<string, any>, Params>()
  const { getApiService } = useDependencies()
  const apiService = getApiService()
  const { token } = useAuth()
  const travelService = apiService.getTravel(token)
  const travelRecipe = useAppSelector((state: RootState) => state.travelRecipe)
  const dispatch = useAppDispatch()
  const theme = useTheme()
  const { t } = useTranslation('translation', { keyPrefix: 'travel_recipes_get_page' })

  const fetchData = async (): Promise<TravelRecipe> => {
    const travelRecipeTemp = await travelService.get(id)
    dispatch(setNewTravelRecipe(travelRecipeTemp))
    return travelRecipeTemp
  }

  const {
    loading,
  } = useFetch<TravelRecipe>({
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
      <Stack
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
        flexDirection="row"
        sx={{
          width: '100%',
        }}
      >
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate(Pages.TRAVEL_RECIPES_STORE.getRedirectLink())}
        >
          {t('back')}
        </Button>
      </Stack>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 1,
        }}
      >

        <Typography variant="h4">
          {travelRecipe.name}
        </Typography>
        <Stack
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="row"
          gap={1}
        >
          <SignUpForTrip.Component
            id={travelRecipe.id}
            name={travelRecipe.name}
            button={(
              <Tooltip title={t('plan_travel')}>
                <IconButton
                  color="primary"
                >
                  <EventAvailable fontSize="medium" />
                </IconButton>
              </Tooltip>
            )}
          />

          <CopyToClipboard.Component
            color={theme.palette.primary.main}
            fontSize="medium"
            text={`${window.location.host}/travel-recipe/${id}`}
          />
        </Stack>
      </Box>

      {/* Accommodations Section */}
      <Box>
        <Typography variant="h5" fontWeight={700} color="text.primary" gutterBottom>
          {t('accommodations')}
        </Typography>
        <AccommodationTable.Component />
      </Box>

      {/* Day Schedule Section */}
      <Box>
        <Typography variant="h5" fontWeight={700} color="text.primary" gutterBottom>
          {t('day_schedule')}
        </Typography>
        <Stack gap={3}>
          {Array.from({ length: travelRecipe.countDays }, (_, i) => (
            <Box key={i}>
              <Typography variant="h6" fontWeight={600} color="text.primary" gutterBottom>
                {t('day')} {i + 1}
              </Typography>
              <TravelDayTable.Component countDay={i + 1} />
            </Box>
          ))}
        </Stack>
      </Box>
    </Stack>
  )
}

export default TravelRecipeComponent
