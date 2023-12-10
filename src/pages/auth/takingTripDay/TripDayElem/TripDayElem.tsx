import React from 'react'
import {
  Button, Grid, Stack, Typography, useTheme,
} from '@mui/material'
import { green } from '@mui/material/colors'
import dayjs from 'dayjs'
import {
  Restaurant as RestaurantIcon,
  Attractions as AttractionIcon,
  AirplanemodeActive as TravelIcon,
} from '@mui/icons-material'
import { ElementTravelInstance } from '../../../../model'
import PassElementTravelModal from './PassElementTravelModal'
import { useAppDispatch } from '../../../../app/hooks'
import { cancelTravelElementInstance } from '../../../../features/travelInstance/travelInstanceSlice'
import { useDependencies } from '../../../../context/dependencies'
import { useAuth } from '../../../../context/auth'

type Props = {
  travelElement: ElementTravelInstance
}

const TripDayElem: React.FC<Props> = (props) => {
  const theme = useTheme()
  const dispatch = useAppDispatch()

  const { getApiService, getToastUtils } = useDependencies()
  const toastUtils = getToastUtils()
  const apiService = getApiService()
  const { token } = useAuth()
  const travelService = apiService.getTravel(token)

  const getIcon = (type: string) => {
    switch (type) {
      case 'Atrakcja':
        return <AttractionIcon style={{ color: theme.palette.primary.main }} />
      case 'Podróż':
        return <TravelIcon style={{ color: theme.palette.primary.main }} />
      case 'Restauracja':
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
        'Wystąpił nieoczekiwany błąd',
      )
    }
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

        <Typography sx={{ fontWeight: 'bold', fontSize: '1.2em' }}>
          {dayjs(props.travelElement.from).format('HH:mm')} - {dayjs(props.travelElement.to).format('HH:mm')}
        </Typography>
      </Stack>

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
            {props.travelElement.photos.map((photo) => (
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
              <Button
                type="button"
                variant="contained"
                color="primary"
                onClick={() => {}}
              >
                Oceń aktywność
              </Button>

              <Button
                type="button"
                variant="contained"
                color="primary"
                onClick={() => {}}
              >
                Odpowiedz na pytania
              </Button>
            </>
          ) : (
            <>
              <PassElementTravelModal
                travelElement={props.travelElement}
              />

              <Button
                type="button"
                variant="contained"
                color="error"
                onClick={cancelTravelElementInstanceFn}
              >
                Odwołaj
              </Button>
            </>
          )
        }
      </Stack>
    </Stack>
  )
}

export default TripDayElem
