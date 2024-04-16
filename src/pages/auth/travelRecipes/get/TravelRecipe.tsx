import React from 'react'
import {
  Button, Stack, Typography, useTheme,
} from '@mui/material'
import { ReceiptLong } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import * as UnexpectedError from '../../../../components/UI/UnexpectedError'
import * as Header from '../../../../components/Header'
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
  id: string
}

const TravelRecipeComponent: React.FC = () => {
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

      <Stack
        style={{
          marginTop: '0',
          marginBottom: '0',
        }}
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        gap={1}
      >
        <Typography>
          {t('share')}
        </Typography>
        <CopyToClipboard.Component
          color={theme.palette.primary.main}
          text={window.location.href}
          fontSize="small"
        />
      </Stack>

      <Stack>
        <h2
          style={{ marginTop: 0 }}
        >
          {t('accommodations')}
        </h2>

        <AccommodationTable.Component />
      </Stack>

      <Stack>
        <h2
          style={{ marginTop: 0, marginBottom: 0 }}
        >
          {t('day_schedule')}
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
                  {t('day')} {i + 1}
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
        id={travelRecipe.id}
        name={travelRecipe.name}
      />

      <Button
        type="button"
        variant="outlined"
        onClick={() => navigate(Pages.TRAVEL_RECIPES_STORE.getRedirectLink())}
      >
        {t('back_to_trips')}
      </Button>
    </Stack>
  )
}

export default TravelRecipeComponent
