import {
  Button,
  Card, CardContent, CardHeader, Grid, Stack, Typography, useTheme,
} from '@mui/material'
import { grey, green } from '@mui/material/colors'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { TravelInstance } from '../../../../model'
import MenuComponent from './Menu'
import { Pages } from '../../../pages'
import * as Slider from '../../../../components/UI/Slider'
import { DateHandler } from '../../../../utils/Date'

type Props = {
  travelInstance: TravelInstance
  deleteTravelInstance: () => void
}

type RealizationTrip = {
  passed: number
  all: number
}

const TripCard: React.FC<Props> = (props) => {
  const navigate = useNavigate()
  const isWaitingTrip = () => DateHandler.diff(new DateHandler().toISOString(), props.travelInstance.from, 'day') < 0
  const isCompletedTrip = () => DateHandler.diff(new DateHandler().toISOString(), props.travelInstance.from, 'day') > 0
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

    props.travelInstance.travelElements.forEach((elem) => {
      result.all += 1
      if (elem.passed) {
        result.passed += 1
      }
    })

    return result
  }

  const realizationTrip = calculateRealizationTrip()

  const allPhotos = props.travelInstance.travelElements
    .map((elem) => elem.photos)
    .flat()

  return (
    <Card>
      <CardHeader
        title={(
          <Typography>
            { props.travelInstance.travelRecipe.name }
          </Typography>
        )}
        style={{
          backgroundColor: getBackgroundCardHeader(),
          color: 'white',
        }}
        action={(
          <MenuComponent
            isWaitingTrip={isWaitingTrip()}
            deleteTravelInstance={props.deleteTravelInstance}
          />
        )}
      />

      <CardContent>
        <Stack gap={2}>
          <Stack>
            <Typography variant="body1">
              {/* TODO: Add date format */}
              {t('date_range')}
              <b> {new DateHandler(props.travelInstance.from).format('DD-MM-YYYY')} </b> -
              <b> {new DateHandler(props.travelInstance.to).format('DD-MM-YYYY')} </b>
            </Typography>

            <Typography variant="body1">
              {t('realized')}:
              <b> { realizationTrip.passed }/{realizationTrip.all} </b>
              (<b> {((realizationTrip.passed / realizationTrip.all) * 100).toFixed(2)}% </b>)
            </Typography>
          </Stack>

          <Grid
            container
            spacing={2}
          >
            {
              allPhotos.map((photo, index) => (
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
                    startIndex={index}
                    images={allPhotos}
                  />
                </Grid>
              ))
            }
          </Grid>

          <Button
            variant="contained"
            onClick={() => navigate(Pages.TAKING_TRIP.getRedirectLink({
              id: props.travelInstance.id.toString(),
            }))}
          >
            {t('go')}
          </Button>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default TripCard
