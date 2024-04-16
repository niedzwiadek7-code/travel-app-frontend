import React from 'react'
import {
  Button, Grid, Stack, Typography, useTheme,
} from '@mui/material'
import { green } from '@mui/material/colors'
import {
  Restaurant as RestaurantIcon,
  Attractions as AttractionIcon,
  AirplanemodeActive as TravelIcon,
} from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import { ActivityType, ElementTravelInstance } from '../../../../model'
import { useAppDispatch } from '../../../../app/hooks'
import { cancelTravelElementInstance } from '../../../../features/travelInstance/travelInstanceSlice'
import { useDependencies, useAuth } from '../../../../context'
import * as Slider from '../../../../components/UI/Slider'
import * as PassActivity from '../../../../components/Activity/PassActivity'
import * as RateActivity from '../../../../components/Activity/RateActivity'
import { DateHandler } from '../../../../utils/Date'

type Props = {
  travelElement: ElementTravelInstance
}

const TripDayElem: React.FC<Props> = (props) => {
  const theme = useTheme()
  const dispatch = useAppDispatch()
  const { t } = useTranslation('translation', { keyPrefix: 'taking_trip_day_page' })

  const { getApiService, getToastUtils } = useDependencies()
  const toastUtils = getToastUtils()
  const apiService = getApiService()
  const { token } = useAuth()
  const travelService = apiService.getTravel(token)

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
      await travelService.cancelTravelElementInstance(props.travelElement.id)
      dispatch(cancelTravelElementInstance(props.travelElement.id))
    } catch (err) {
      toastUtils.Toast.showToast(
        toastUtils.types.ERROR,
        t('error'),
      )
    }
  }

  const getPlaceString = () => {
    const { activity } = props.travelElement
    if (activity.place) {
      return activity.place
    }
    return `${activity.from} - ${activity.to}`
  }

  return (
    <Stack
      direction="column"
      gap={1}
      style={{
        padding: '.8em',
        backgroundColor: props.travelElement.passed ? green[50] : theme.palette.grey[200],
        borderRadius: '.8em',
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
      >
        <Stack
          direction="row"
          alignItems="center"
          gap={1}
          sx={{ fontWeight: 'bold', fontSize: '1.2em' }}
        >
          {getIcon(props.travelElement.activity.activityType)}
          {props.travelElement.activity.name.toUpperCase()}
        </Stack>

        <Typography>
          {new DateHandler(props.travelElement.from).format('HH:mm')} - {new DateHandler(props.travelElement.to).format('HH:mm')}
        </Typography>
      </Stack>

      <Typography>
        {t('place')}: {getPlaceString()}
      </Typography>

      {
        props.travelElement.elementTravel && (
          <Typography>
            {props.travelElement.elementTravel.description}
          </Typography>
        )
      }

      {
        props.travelElement.passed && (
          <Grid
            container
            spacing={2}
          >
            {props.travelElement.photos.map((photo, index) => (
              <Grid
                item
                key={photo}
                xs={2}
              >
                <Slider.Component
                  buttonComponent={(
                    <button
                      type="button"
                      style={{
                        margin: 0,
                        padding: 0,
                        border: 0,
                        width: '100%',
                        height: '100%',
                        cursor: 'pointer',
                        background: 'none',
                      }}
                    >
                      <img
                        src={photo}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          borderRadius: '5px',
                        }}
                        alt=""
                      />
                    </button>
                  )}
                  images={props.travelElement.photos}
                  startIndex={index}
                />
              </Grid>
            ))}
          </Grid>
        )
      }

      <Stack
        direction="row"
        justifyContent="flex-end"
        gap={1}
      >
        {
          props.travelElement.passed ? (
            <>
              <RateActivity.Component
                elemId={props.travelElement.id}
                name={props.travelElement.activity.name}
              />

              <Button
                type="button"
                variant="contained"
                color="primary"
                onClick={() => toastUtils.Toast.showToast(
                  toastUtils.types.INFO,
                  t('unavailable_fn'),
                )}
              >
                {t('answer_for_questions')}
              </Button>
            </>
          ) : (
            <>
              <PassActivity.Component
                travelElement={props.travelElement}
              />

              <Button
                type="button"
                variant="contained"
                color="error"
                onClick={cancelTravelElementInstanceFn}
              >
                {t('cancel')}
              </Button>
            </>
          )
        }
      </Stack>
    </Stack>
  )
}

export default TripDayElem
