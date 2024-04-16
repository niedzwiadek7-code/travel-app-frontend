import React from 'react'
import {
  Button,
  Grid, Stack, Typography, useTheme,
} from '@mui/material'
import { green } from '@mui/material/colors'
import { useTranslation } from 'react-i18next'
import { ElementTravelInstance } from '../../../../model'
import { useAppDispatch } from '../../../../app/hooks'
import { useDependencies, useAuth } from '../../../../context'
import * as PassActivity from '../../../../components/Activity/PassActivity'
import * as RateActivity from '../../../../components/Activity/RateActivity'
import * as Slider from '../../../../components/UI/Slider'
import {
  cancelTravelElementInstance,
} from '../../../../features/travelInstance/travelInstanceSlice'
import { DateHandler } from '../../../../utils/Date'

type Props = {
  elem: ElementTravelInstance,
}

const GloballyElem: React.FC<Props> = (props) => {
  const { getApiService, getToastUtils } = useDependencies()
  const apiService = getApiService()
  const toastUtils = getToastUtils()
  const { token } = useAuth()
  const travelService = apiService.getTravel(token)
  const { t } = useTranslation('translation', { keyPrefix: 'taking_trip_page' })

  const theme = useTheme()
  const dispatch = useAppDispatch()

  const cancelAccommodationElementInstanceFn = async () => {
    try {
      await travelService.cancelTravelElementInstance(
        props.elem.id,
      )
      dispatch(cancelTravelElementInstance(props.elem.id))
    } catch (err) {
      toastUtils.Toast.showToast(
        toastUtils.types.ERROR,
        t('error'),
      )
    }
  }

  return (
    <Stack
      direction="column"
      gap={1}
      style={{
        padding: '.8em',
        backgroundColor: props.elem.passed ? green[50] : theme.palette.grey[200],
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
          {props.elem.activity.name}
        </Stack>

        <Typography>
          {new DateHandler(props.elem.from).format('DD-MM-YYYY')} - {new DateHandler(props.elem.to).format('DD-MM-YYYY')}
        </Typography>
      </Stack>

      <Typography>
        {t('place')}: {props.elem.activity.place}
      </Typography>

      {
        props.elem.elementTravel && (
          <Typography>
            {props.elem.elementTravel.description}
          </Typography>
        )
      }

      {
        props.elem.passed && (
          <Grid
            container
            spacing={2}
          >
            {props.elem.photos.map((photo, index) => (
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
                  images={props.elem.photos}
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
          props.elem.passed ? (
            <>
              <RateActivity.Component
                elemId={props.elem.id}
                name={props.elem.activity.name}
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
                travelElement={props.elem}
              />

              <Button
                type="button"
                variant="contained"
                color="error"
                onClick={cancelAccommodationElementInstanceFn}
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

export default GloballyElem
