import React from 'react'
import {
  Typography,
  Stack,
  Chip,
  Divider,
  Button,
  Paper, Tooltip, IconButton, useTheme,
} from '@mui/material'
import {
  Info,
  ArrowBack, Done, Clear, AddCircleOutline,
} from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import { useAuth, useDependencies } from '../../../../context'
import { useFetch, useRouter } from '../../../../hooks'
import { getActivityTypeIcon, Activity as ActivityModel } from '../../../../model'
import Details from './Details'
import Ratings from './Ratings'
import { StateDto } from './dto/state.dto'
import StateButtons from '../../../../components/StateButtons/StateButtons'
import Loading from '../../../../components/UI/Loading/Loading'
import * as Stars from '../../../../components/UI/Stars'

const Activity: React.FC = () => {
  const theme = useTheme()
  const { params, navigate } = useRouter<StateDto, {}, { id: string }>()
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
      <Loading />
    )
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
        flexDirection="row"
        justifyContent="space-between"
      >
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)}
          sx={{ mb: 3 }}
        >
          {t('back')}
        </Button>
      </Stack>

      <Stack spacing={3} sx={{ position: 'relative' }}>
        <Stack spacing={2} sx={{ textAlign: 'center' }}>
          <Stack
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            flexDirection="row"
          >
            <Typography variant="h3" sx={{ fontWeight: 700 }}>
              {activity.name}
            </Typography>

            <Stack
              display="flex"
              flexDirection="row"
              alignItems="center"
              gap={2}
            >
              <StateButtons
                acceptButton={(
                  <Tooltip title={t('accept')}>
                    <IconButton
                      color="success"
                      sx={{ bgcolor: `${theme.palette.success.light}20` }}
                    >
                      <Done fontSize="small" />
                    </IconButton>
                  </Tooltip>
                )}
                deleteButton={(
                  <Tooltip title={t('reject')}>
                    <IconButton
                      color="error"
                      sx={{ bgcolor: `${theme.palette.error.light}20` }}
                    >
                      <Clear fontSize="small" />
                    </IconButton>
                  </Tooltip>
                )}
                addButton={(
                  <Tooltip title={t('add_to_travel')}>
                    <IconButton
                      color="primary"
                      sx={{ bgcolor: `${theme.palette.primary.light}20` }}
                    >
                      <AddCircleOutline fontSize="small" />
                    </IconButton>
                  </Tooltip>
                )}
                activity={activity}
              />
            </Stack>
          </Stack>

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
              <Stars.Component
                value={activity.averageRating}
                count={activity.countRatings}
                size="medium"
              />
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
              count={activity.countRatings}
            />
          )
        }
      </Stack>
    </Stack>
  )
}

export default Activity
