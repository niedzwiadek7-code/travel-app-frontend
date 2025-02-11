import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Box, Button, Stack, Typography, useTheme,
} from '@mui/material'
import { ArrowBack } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from '../../../app/hooks'
import { RootState } from '../../../app/store'
import { Pages } from '../../pages'
import * as UnexpectedError from '../../../components/UI/UnexpectedError'
import * as TripDayElem from './TripDayElem'
import AddActivityButton from './AddActivityButton'
import { ActivityType } from '../../../model'
import { DateHandler } from '../../../utils/Date'

const TakingTripDay: React.FC = () => {
  const travelInstance = useAppSelector((state: RootState) => state.travelInstance)
  const { date } = useParams()
  const navigate = useNavigate()
  const { t } = useTranslation('translation', { keyPrefix: 'taking_trip_day_page' })
  const theme = useTheme()

  if (!date) {
    return (
      <UnexpectedError.Component />
    )
  }

  const locallyActivityTypes: ActivityType[] = ['Attraction', 'Trip', 'Restaurant']

  const travelElements = travelInstance.travelElements
    .filter((elem) => locallyActivityTypes.includes(elem.activity.activityType))
    .filter((elem) => {
      const dateStr = new DateHandler(elem.from).format('YYYY-MM-DD')
      return dateStr === date
    }).sort((a, b) => {
      if (a.passed && !b.passed) {
        return 1
      }
      if (!a.passed && b.passed) {
        return -1
      }
      return DateHandler.compareDates(b.from, a.from)
    })

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
        sx={{ width: '100%' }}
      >
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate(Pages.TAKING_TRIP.getRedirectLink({
            id: travelInstance.id.toString(),
          }))}
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
          {`${travelInstance.travelRecipe.name} - ${date}`}
        </Typography>

        <AddActivityButton
          travelInstanceId={travelInstance.id.toString()}
          date={date}
        />
      </Box>

      <Stack
        gap={2}
      >
        {
          travelElements.map((elem) => (
            <TripDayElem.Component
              key={elem.id}
              travelElement={elem}
            />
          ))
        }
      </Stack>
    </Stack>
  )
}

export default TakingTripDay
