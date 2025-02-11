import React from 'react'
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Stack,
  Typography,
  useTheme,
  Box, LinearProgress, alpha,
} from '@mui/material'
import { grey, green } from '@mui/material/colors'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { TravelExplore } from '@mui/icons-material'
import { TravelInstance } from '../../../../model'
import MenuComponent from './Menu'
import { Pages } from '../../../pages'
import * as Slider from '../../../../components/UI/Slider'
import { DateHandler } from '../../../../utils/Date'
import Image from '../../../../components/UI/Image/Image'

type Props = {
  travelInstance: TravelInstance;
  deleteTravelInstance: () => void;
};

type RealizationTrip = {
  passed: number;
  all: number;
};

const TripCard: React.FC<Props> = ({ travelInstance, deleteTravelInstance }) => {
  const navigate = useNavigate()
  const isWaitingTrip = () => DateHandler.diff(new DateHandler().toISOString(), travelInstance.from, 'day') < 0
  const isCompletedTrip = () => DateHandler.diff(new DateHandler().toISOString(), travelInstance.from, 'day') > 0
  const theme = useTheme()
  const { t } = useTranslation('translation', { keyPrefix: 'realized_trips_page.trip_card' })

  const getBackgroundCardHeader = (): string => {
    if (isWaitingTrip()) {
      return grey[700]
    }

    if (isCompletedTrip()) {
      return green[700]
    }

    return theme.palette.primary.main
  }

  const calculateRealizationTrip = (): RealizationTrip => {
    const result: RealizationTrip = {
      passed: 0,
      all: 0,
    }

    travelInstance.travelElements.forEach((elem) => {
      result.all += 1
      if (elem.passed) {
        result.passed += 1
      }
    })

    return result
  }

  const realizationTrip = calculateRealizationTrip()
  const progress = (realizationTrip.passed / realizationTrip.all) * 100

  const allPhotos = travelInstance.travelElements
    .map((elem) => elem.photos)
    .flat()

  return (
    <Card
      sx={{
        borderRadius: '12px',
        boxShadow: theme.shadows[2],
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: theme.shadows[4],
        },
      }}
    >
      <CardHeader
        sx={{
          backgroundColor: getBackgroundCardHeader(),
          color: theme.palette.common.white,
          borderTopLeftRadius: '12px',
          borderTopRightRadius: '12px',
          padding: theme.spacing(2),
        }}
        title={(
          <Typography variant="h6" fontWeight={700}>
            {travelInstance.travelRecipe.name}
          </Typography>
        )}
        action={(
          <MenuComponent
            isWaitingTrip={isWaitingTrip()}
            deleteTravelInstance={deleteTravelInstance}
          />
        )}
      />

      <CardContent>
        <Stack gap={2}>
          <Typography variant="body1" color="text.secondary">
            {t('date_range')}{' '}
            <Typography component="span" fontWeight={600} color="text.primary">
              {new DateHandler(travelInstance.from).format('DD-MM-YYYY')} -{' '}
              {new DateHandler(travelInstance.to).format('DD-MM-YYYY')}
            </Typography>
          </Typography>

          <Box>
            <Typography variant="body1" color="text.secondary">
              {t('realized')}:
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: theme.spacing(1),
                width: '100%',
              }}
            >
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                  flexGrow: 1,
                  height: '10px',
                  borderRadius: '5px',
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  '& .MuiLinearProgress-bar': {
                    borderRadius: '5px',
                    backgroundColor: theme.palette.primary.main,
                  },
                }}
              />
              <Box
                // variant="body1"
                fontWeight={600}
                color="text.primary"
                sx={{
                  minWidth: '60px',
                  textAlign: 'right',
                }}
              >
                {`${progress.toFixed(2)}%`}
              </Box>
            </Box>
          </Box>

          {allPhotos.length > 0 && (
            <Stack spacing={1}>
              <Typography variant="caption" color="text.secondary">
                {t('photos')} ({allPhotos.length})
              </Typography>
              <Stack direction="row" spacing={1} rowGap={1} flexWrap="wrap">
                {
                  allPhotos.slice(0, 5).map((photo, index) => (
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
                          <Image
                            src={photo}
                            alt={`Review ${index + 1}`}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                            }}
                          />
                          {index === 4 && allPhotos.length > 5 && (
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
                              +{allPhotos.length - 5}
                            </Typography>
                          </Box>
                          )}
                        </Box>
                    )}
                      images={allPhotos}
                      startIndex={index}
                    />
                  ))
                }
              </Stack>
            </Stack>
          )}

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
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate(
                Pages.TAKING_TRIP.getRedirectLink({
                  id: travelInstance.id.toString(),
                }),
              )}
              startIcon={<TravelExplore />}
            >
              {t('browse')}
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default TripCard
