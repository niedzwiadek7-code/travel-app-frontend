import React from 'react'
import {
  Button,
  Grid, Stack, Typography, useTheme,
} from '@mui/material'
import { green } from '@mui/material/colors'
import { AccommodationElementInstance } from '../../../../model'
import { useAppDispatch } from '../../../../app/hooks'
import { useDependencies } from '../../../../context/dependencies'
import { useAuth } from '../../../../context/auth'
import { cancelAccommodationElementInstance } from '../../../../features/travelInstance/travelInstanceSlice'
import PassAccommodationTravelModal from './PassAccommodationTravelModal'
import RateAccommodation from './RateAccommodation'
import * as Slider from '../../../../components/UI/Slider'

type Props = {
  accommodationElement: AccommodationElementInstance,
}

const AccommodationElem: React.FC<Props> = (props) => {
  const { getApiService, getToastUtils } = useDependencies()
  const apiService = getApiService()
  const toastUtils = getToastUtils()
  const { token } = useAuth()
  const travelService = apiService.getTravel(token)

  const theme = useTheme()
  const dispatch = useAppDispatch()

  const cancelAccommodationElementInstanceFn = async () => {
    try {
      await travelService.cancelAccommodationElementInstance(
        props.accommodationElement.id.toString(),
      )
      dispatch(cancelAccommodationElementInstance(props.accommodationElement.id.toString()))
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
        backgroundColor: props.accommodationElement.passed ? green[50] : theme.palette.grey[200],
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
          {props.accommodationElement.accommodation.name}
        </Stack>

        <Typography sx={{ fontWeight: 'bold', fontSize: '1.2em' }}>
          {props.accommodationElement.accommodation.place}
        </Typography>
      </Stack>

      {
        props.accommodationElement.elementTravel && (
          <Typography>
            {props.accommodationElement.elementTravel.description}
          </Typography>
        )
      }

      {
        props.accommodationElement.passed && (
          <Grid
            container
            spacing={2}
          >
            {props.accommodationElement.photos.map((photo, index) => (
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
                        src={`${process.env.REACT_APP_BACKEND_URL}/${photo}`}
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
                  images={
                    props.accommodationElement.photos
                      .map((photoTmp) => `${process.env.REACT_APP_BACKEND_URL}/${photoTmp}`)
                  }
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
          props.accommodationElement.passed ? (
            <>
              <RateAccommodation
                elemId={props.accommodationElement.id}
                name={props.accommodationElement.accommodation.name}
              />

              <Button
                type="button"
                variant="contained"
                color="primary"
                onClick={() => toastUtils.Toast.showToast(
                  toastUtils.types.INFO,
                  'Ta funkcja nie jest obecnie dostępna',
                )}
              >
                Odpowiedz na pytania
              </Button>
            </>
          ) : (
            <>
              <PassAccommodationTravelModal
                accommodationElement={props.accommodationElement}
              />

              <Button
                type="button"
                variant="contained"
                color="error"
                onClick={cancelAccommodationElementInstanceFn}
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

export default AccommodationElem
