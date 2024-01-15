import {
  Button,
  Card, CardContent, CardHeader, Grid, Stack, Typography, useTheme,
} from '@mui/material'
import { grey, green } from '@mui/material/colors'
import React from 'react'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'
import { TravelInstance } from '../../../../model'
import MenuComponent from './Menu'
import { Pages } from '../../../pages'

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
  const isWaitingTrip = () => dayjs().diff(props.travelInstance.from) < 0
  const isCompletedTrip = () => dayjs().diff(props.travelInstance.to) > 0
  const theme = useTheme()

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

  const allPhotos = props.travelInstance.travelElements.map(
    (elem) => elem.photos,
  ).flat()

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
              Termin wycieczki
              <b> {props.travelInstance.from} </b> -
              <b> {props.travelInstance.to} </b>
            </Typography>

            <Typography variant="body1">
              Zrealizowano:
              <b> { realizationTrip.passed } / {realizationTrip.all} </b>
              (<b> {((realizationTrip.passed / realizationTrip.all) * 100).toFixed(2)}% </b>)
            </Typography>
          </Stack>

          <Grid
            container
            spacing={2}
          >
            {
              allPhotos.map((photo) => (
                <Grid
                  item
                  key={photo}
                  xs={2}
                >
                  <img
                    src={`http://localhost:3000/${photo}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '5px',
                    }}
                    alt=""
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
            Przejdź
          </Button>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default TripCard
