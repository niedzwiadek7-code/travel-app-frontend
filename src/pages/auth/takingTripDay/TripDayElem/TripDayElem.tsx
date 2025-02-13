import React, { useState } from 'react'
import {
  Button,
  Stack,
  Typography,
  useTheme,
  Card,
  Box,
  alpha,
} from '@mui/material'
import { green } from '@mui/material/colors'
import {
  Restaurant as RestaurantIcon,
  Attractions as AttractionIcon,
  AirplanemodeActive as TravelIcon,
  QuestionAnswer,
  Cancel,
} from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import { LoadingButton } from '@mui/lab'
import { ActivityType, ElementTravelInstance } from '../../../../model'
import { useAppDispatch } from '../../../../app/hooks'
import { cancelTravelElementInstance } from '../../../../features/travelInstance/travelInstanceSlice'
import { useDependencies, useAuth } from '../../../../context'
import * as Slider from '../../../../components/UI/Slider'
import * as Image from '../../../../components/UI/Image'
import * as PassActivity from '../../../../components/Activity/PassActivity'
import * as RateActivity from '../../../../components/Activity/RateActivity'
import { DateHandler } from '../../../../utils/Date'

type Props = {
  travelElement: ElementTravelInstance;
};

const TripDayElem: React.FC<Props> = ({ travelElement }) => {
  const theme = useTheme()
  const dispatch = useAppDispatch()
  const { t } = useTranslation('translation', { keyPrefix: 'taking_trip_day_page' })

  const { getApiService, getToastUtils } = useDependencies()
  const toastUtils = getToastUtils()
  const apiService = getApiService()
  const { token } = useAuth()
  const travelService = apiService.getTravel(token)
  const [cancelLoading, setCancelLoading] = useState<boolean>(false)

  const getIcon = (type: ActivityType) => {
    switch (type) {
      case 'Attraction':
        return <AttractionIcon style={{ color: theme.palette.primary.main }} />
      case 'Trip':
        return <TravelIcon style={{ color: theme.palette.primary.main }} />
      case 'Restaurant':
        return <RestaurantIcon style={{ color: theme.palette.primary.main }} />
      default:
        return <> </>
    }
  }

  const cancelTravelElementInstanceFn = async () => {
    try {
      setCancelLoading(true)
      await travelService.cancelTravelElementInstance(travelElement.id)
      dispatch(cancelTravelElementInstance(travelElement.id))
      toastUtils.Toast.showToast(toastUtils.types.SUCCESS, t('cancel_success'))
      setCancelLoading(false)
    } catch (err) {
      toastUtils.Toast.showToast(toastUtils.types.ERROR, t('error'))
    }
  }

  const getPlaceString = () => {
    const { activity } = travelElement
    if (activity.place) {
      return activity.place
    }
    return `${activity.from} - ${activity.to}`
  }

  return (
    <Card
      sx={{
        backgroundColor: travelElement.passed
          ? alpha(green[500], 0.1)
          : alpha(theme.palette.grey[300], 0.2),
        borderRadius: '12px',
        boxShadow: theme.shadows[1],
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: theme.shadows[3],
        },
        padding: theme.spacing(2),
      }}
    >
      <Stack direction="column" gap={2}>
        {/* Header Section */}
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Stack direction="row" alignItems="center" gap={1}>
            {getIcon(travelElement.activity.activityType)}
            <Typography variant="h6" fontWeight={700} color="text.primary">
              {travelElement.activity.name.toUpperCase()}
            </Typography>
          </Stack>
          <Typography variant="body2" color="text.secondary">
            {new DateHandler(travelElement.from).format('HH:mm')} -{' '}
            {new DateHandler(travelElement.to).format('HH:mm')}
          </Typography>
        </Stack>

        {/* Place Section */}
        <Typography variant="body1" color="text.secondary">
          {t('place')}:{' '}
          <Typography component="span" fontWeight={600} color="text.primary">
            {getPlaceString()}
          </Typography>
        </Typography>

        {/* Description Section */}
        {travelElement.elementTravel && (
          <Typography variant="body1" color="text.secondary">
            {travelElement.elementTravel.description}
          </Typography>
        )}

        {/* Photos Section */}
        {travelElement.passed && travelElement.photos.length > 0 && (
          <Stack direction="row" spacing={1} rowGap={1} flexWrap="wrap">
            {travelElement.photos.slice(0, 5).map((photo, index) => (
              <Slider.Component
                key={photo}
                buttonComponent={(
                  <Box
                    sx={{
                      position: 'relative',
                      flexShrink: 0,
                      borderRadius: 1,
                      overflow: 'hidden',
                      width: 100,
                      height: 100,
                      cursor: 'pointer',
                    }}
                  >
                    <Image.Component
                      src={photo}
                      alt={`Review ${index + 1}`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                    {index === 4 && travelElement.photos.length > 5 && (
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          bgcolor: 'rgba(0,0,0,0.5)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Typography variant="body1" color="white !important">
                          +{travelElement.photos.length - 5}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                )}
                images={travelElement.photos}
                startIndex={index}
              />
            ))}
          </Stack>
        )}

        {/* Actions Section */}
        <Stack
          display="flex"
          gap={1}
          justifyContent={{
            xs: 'flex-start',
            md: 'flex-end',
          }}
          flexDirection={{
            xs: 'column',
            md: 'row',
          }}
        >
          {travelElement.passed ? (
            <>
              <RateActivity.Component
                elemId={travelElement.id}
                name={travelElement.activity.name}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => toastUtils.Toast.showToast(toastUtils.types.INFO, t('unavailable_fn'))}
                startIcon={<QuestionAnswer />}
              >
                {t('answer_for_questions')}
              </Button>
            </>
          ) : (
            <>
              <PassActivity.Component
                travelElement={travelElement}
              />
              <LoadingButton
                type="button"
                variant="contained"
                color="error"
                onClick={cancelTravelElementInstanceFn}
                loading={cancelLoading}
                startIcon={<Cancel />}
              >
                {t('cancel')}
              </LoadingButton>
            </>
          )}
        </Stack>
      </Stack>
    </Card>
  )
}

export default TripDayElem
