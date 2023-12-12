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
            {props.accommodationElement.photos.map((photo) => (
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
          props.accommodationElement.passed ? (
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
