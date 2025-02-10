import React from 'react'
import { Stack, Typography } from '@mui/material'
import { AccessTime, MonetizationOn, Place } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import { Activity } from '../../../../model'

type Props = {
  activity: Activity
}

const Details: React.FC<Props> = ({
  activity,
}) => {
  const { t } = useTranslation('translation', { keyPrefix: 'activity_get' })

  const formatter = Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'PLN',
  })

  switch (activity.activityType) {
    case 'Trip':
      return (
        <Stack spacing={1.5}>
          {activity.place && (
            <Stack direction="row" spacing={1} alignItems="center">
              <Place fontSize="small" color="secondary" />
              <Typography variant="body1">{activity.place}</Typography>
            </Stack>
          )}
          <Stack direction="row" spacing={1} alignItems="center">
            <AccessTime fontSize="small" color="secondary" />
            <Typography variant="body1">
              {activity.from} - {activity.to}
            </Typography>
          </Stack>
        </Stack>
      )
    case 'Attraction':
      return (
        <Stack spacing={1.5}>
          {activity.place && (
            <Stack direction="row" spacing={1} alignItems="center">
              <Place fontSize="small" color="secondary" />
              <Typography variant="body1">{activity.place}</Typography>
            </Stack>
          )}
          <Stack direction="row" spacing={1} alignItems="center">
            <MonetizationOn fontSize="small" color="secondary" />
            <Typography variant="body1">
              {formatter.format(activity.price)} / {t(activity.priceType || '')}
            </Typography>
          </Stack>
        </Stack>
      )
    case 'Accommodation':
      return (
        <Stack spacing={1.5}>
          {activity.place && (
            <Stack direction="row" spacing={1} alignItems="center">
              <Place fontSize="small" color="secondary" />
              <Typography variant="body1">{activity.place}</Typography>
            </Stack>
          )}
          <Stack direction="row" spacing={1} alignItems="center">
            <MonetizationOn fontSize="small" color="secondary" />
            <Typography variant="body1">
              {formatter.format(activity.price)} / {t('day')}
            </Typography>
          </Stack>
        </Stack>
      )
    case 'Restaurant':
      return (
        <Stack spacing={1.5}>
          {activity.place && (
            <Stack direction="row" spacing={1} alignItems="center">
              <Place fontSize="small" color="secondary" />
              <Typography variant="body1">{activity.place}</Typography>
            </Stack>
          )}
        </Stack>
      )
    default:
      return null
  }
}

export default Details
