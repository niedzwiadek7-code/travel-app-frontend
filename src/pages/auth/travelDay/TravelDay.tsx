import React from 'react'
import {
  Stack, Button, useTheme, Typography,
} from '@mui/material'
import { ArrowBack } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import { Pages } from '../../pages'
import * as TravelDayTable from './TravelDayTable'
import { useAppSelector } from '../../../app/hooks'
import { RootState } from '../../../app/store'
import AddActivityButton from './AddActivityButton'
import * as UnexpectedError from '../../../components/UI/UnexpectedError'
import { useRouter } from '../../../hooks'

type Params = {
  countDay: string
}

const TravelDay: React.FC = () => {
  const travelRecipe = useAppSelector((state: RootState) => state.travelRecipe)
  const {
    params: { countDay },
    navigate,
  } = useRouter<
    Record<string, any>,
    Record<string, any>,
    Params
  >()
  const { t } = useTranslation('translation', { keyPrefix: 'travel_day_page' })
  const theme = useTheme()

  if (!countDay) {
    return (
      <UnexpectedError.Component />
    )
  }

  return (
    <Stack
      gap={2}
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
        sx={{ width: '100%' }}
      >
        <Button
          startIcon={<ArrowBack />}
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
          {t('back')}
        </Button>
      </Stack>

      <Stack
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        flexDirection="row"
      >
        <Typography variant="h4" fontWeight={700} color="text.primary">
          {`${t('day')} ${countDay}`}
        </Typography>

        <AddActivityButton
          countDay={countDay}
        />
      </Stack>

      <TravelDayTable.Component
        countDay={parseInt(countDay, 10)}
      />

      <Stack
        direction="row"
        justifyContent="flex-end"
        gap={1}
        style={{ marginTop: '1em' }}
      />
    </Stack>
  )
}

export default TravelDay
