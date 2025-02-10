import React from 'react'
import {
  Box,
  Typography,
  Stack,
  Chip,
  Divider,
  Button,
  Avatar,
  Skeleton,
  Paper,
} from '@mui/material'
import {
  Info,
  ArrowBack, Reviews,
} from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import { useAuth, useDependencies } from '../../../../context'
import { useFetch, useRouter } from '../../../../hooks'
import { getActivityTypeIcon, Activity as ActivityModel } from '../../../../model'
import * as Slider from '../../../../components/UI/Slider'
import Details from './Details'
import Ratings from './Ratings'

const Activity: React.FC = () => {
  const { params, navigate } = useRouter<{}, {}, { id: string }>()
  const { t } = useTranslation('translation', { keyPrefix: 'activity_get' })
  const { t: tCategories } = useTranslation('translation', { keyPrefix: 'categories' })
  const { token } = useAuth()
  const { getApiService } = useDependencies()
  const apiService = getApiService()
  const activityService = apiService.getActivity(token)

  const fetchData = async () => activityService.get(params.id)

  const { data: activity, loading } = useFetch<ActivityModel>({
    fetchData,
    defaultData: undefined,
  })

  const Icon = getActivityTypeIcon(activity?.activityType || 'Trip')

  if (loading || !activity) {
    return (
      <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
        <Stack spacing={3}>
          <Skeleton variant="rectangular" width={200} height={40} />
          <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 3 }} />
          <Stack spacing={2}>
            <Skeleton variant="rounded" height={80} />
            <Skeleton variant="rounded" height={80} />
            <Skeleton variant="rounded" height={80} />
          </Stack>
        </Stack>
      </Box>
    )
  }

  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate(-1)}
        sx={{ mb: 3 }}
      >
        {t('back')}
      </Button>

      <Stack spacing={3} sx={{ position: 'relative' }}>
        <Stack spacing={2} sx={{ textAlign: 'center' }}>
          <Typography variant="h3" sx={{ fontWeight: 700 }}>
            {activity.name}
          </Typography>

          <Chip
            label={tCategories(activity.activityType)}
            color="primary"
            icon={<Icon fontSize="small" />}
            sx={{ mx: 'auto', borderRadius: 1 }}
          />
        </Stack>

        <Paper
          sx={{ p: 3, borderRadius: 3 }}
        >
          <Stack spacing={1}>
            <Stack spacing={2}>
              <Stack
                display="flex"
                alignItems="center"
                flexDirection="row"
                gap={2}
              >
                <Info
                  color="primary"
                />
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  {t('details')}
                </Typography>
              </Stack>
              <Divider />
              <Details
                activity={activity}
              />
            </Stack>

            <Stack spacing={2}>
              {
                activity.description && (
                  <Stack spacing={2}>
                    {/* <Divider /> */}
                    <Typography
                      variant="body1"
                      sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.7 }}
                    >
                      {activity.description}
                    </Typography>
                  </Stack>
                )
              }
            </Stack>
          </Stack>
        </Paper>

        {
          activity.ratings.length > 0 && (
            <Ratings
              ratings={activity.ratings}
            />
          )
        }
      </Stack>
    </Box>
  )
}

export default Activity
