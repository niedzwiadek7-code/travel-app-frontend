// ActivityCard.tsx
import React from 'react'
import {
  Avatar,
  Stack,
  Typography,
  IconButton,
  Tooltip,
  useTheme,
  Chip,
} from '@mui/material'
import {
  AddCircleOutline,
  Info,
  Done,
  Place,
  AccessTime,
  MonetizationOn,
  Clear,
} from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import { useRouter } from '../../../../hooks'
import { Pages } from '../../../pages'
import { ExtendedActivityFormat } from '../../../../services/backend/Activity/types'
import { getActivityTypeIcon } from '../../../../model'
import { StateDto } from '../dto/state.dto'
import * as SaveInstanceActivityModal from '../../../../components/SaveInstanceActivityModal'
import * as SaveActivityModal from '../../../../components/SaveActivityModal'

type Props = {
  activity: ExtendedActivityFormat
  acceptElement: () => void
  deleteElement: () => void
}

const ActivityCard: React.FC<Props> = ({ activity, acceptElement, deleteElement }) => {
  const theme = useTheme()
  const { navigate, state } = useRouter<
    StateDto,
    Record<string, any>,
    Record<string, any>
  >()
  const { t } = useTranslation('translation', { keyPrefix: 'activity_list_page.activities' })
  const Icon = getActivityTypeIcon(activity.activityType)
  const primaryImage = activity.ratings[0]?.photos[0]

  const getDetails = () => {
    switch (activity.activityType) {
      case 'Trip':
        return {
          icon: <AccessTime fontSize="small" />,
          text: `${activity.from} - ${activity.to}`,
        }
      case 'Attraction':
        return {
          icon: <MonetizationOn fontSize="small" />,
          text: `${activity.price}zł / ${t(activity.priceType || '')}`,
        }
      case 'Accommodation':
        return {
          icon: <MonetizationOn fontSize="small" />,
          text: `${activity.price}zł / ${t('day')}`,
        }
      default:
        return null
    }
  }

  const details = getDetails()

  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        p: 3,
        alignItems: 'center',
        position: 'relative',
        '&:hover': {
          '& .action-buttons': {
            opacity: 1,
          },
        },
      }}
    >
      <Avatar
        variant="rounded"
        src={primaryImage}
        sx={{
          width: 100,
          height: 100,
          borderRadius: 2,
          boxShadow: theme.shadows[2],
          flexShrink: 0,
        }}
      >
        {!primaryImage && <Icon fontSize="large" />}
      </Avatar>

      <Stack sx={{ flexGrow: 1, minWidth: 0 }}>
        <Stack direction="row" alignItems="center" mb={1} gap={1}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {activity.name}
          </Typography>

          <Chip
            label={t(activity.activityType)}
            color="primary"
            size="small"
            icon={<Icon fontSize="small" />}
            sx={{ borderRadius: 1 }}
          />
        </Stack>

        <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
          {activity.place && (
            <Stack direction="row" spacing={1} alignItems="center">
              <Place fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                {activity.place}
              </Typography>
            </Stack>
          )}

          {details && (
            <Stack direction="row" spacing={1} alignItems="center">
              {details.icon}
              <Typography variant="body2" color="text.secondary">
                {details.text}
              </Typography>
            </Stack>
          )}
        </Stack>
      </Stack>

      <Stack
        direction="row"
        spacing={1}
        className="action-buttons"
        sx={{
          opacity: { xs: 1, md: 0.7 },
          transition: 'opacity 0.2s',
          flexShrink: 0,
          '&:hover': {
            opacity: '1 !important',
          },
        }}
      >
        {state?.admin && (
          <>
            <Tooltip title={t('accept')}>
              <IconButton
                color="success"
                onClick={acceptElement}
                sx={{ bgcolor: `${theme.palette.success.light}20` }}
              >
                <Done fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title={t('reject')}>
              <IconButton
                color="error"
                onClick={deleteElement}
                sx={{ bgcolor: `${theme.palette.error.light}20` }}
              >
                <Clear fontSize="small" />
              </IconButton>
            </Tooltip>
          </>
        )}

        {
          state?.travelRecipe && (
            <SaveActivityModal.Component
              button={(
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
              countDay={state?.countDay || ''}
            />
          )
         }

        {
          state?.travelInstance && (
            <SaveInstanceActivityModal.Component
              button={(
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
              date={state?.date || ''}
            />
          )
        }

        <Tooltip title={t('details')}>
          <IconButton
            color="info"
            sx={{ bgcolor: `${theme.palette.info.light}20` }}
            onClick={() => navigate(
              Pages.ACTIVITY_GET.getRedirectLink({ id: activity.id.toString() }),
              { state },
            )}
          >
            <Info fontSize="small" />
          </IconButton>
        </Tooltip>
      </Stack>
    </Stack>
  )
}

export default ActivityCard
