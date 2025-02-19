import React from 'react'
import {
  Button,
  Stack,
  Typography,
  useTheme,
  alpha,
  Box, Card,
} from '@mui/material'
import { green } from '@mui/material/colors'
import { useTranslation } from 'react-i18next'
import {
  Cancel, QuestionAnswer,
} from '@mui/icons-material'
import { ElementTravelInstance } from '../../../../model'
import { useAppDispatch } from '../../../../app/hooks'
import { useDependencies, useAuth } from '../../../../context'
import * as PassActivity from '../../../../components/Activity/PassActivity'
import * as RateActivity from '../../../../components/Activity/RateActivity'
import * as Slider from '../../../../components/UI/Slider'
import * as Image from '../../../../components/UI/Image'
import { cancelTravelElementInstance } from '../../../../features/travelInstance/travelInstanceSlice'
import { DateHandler } from '../../../../utils/Date'

type Props = {
  elem: ElementTravelInstance;
};

const GloballyElem: React.FC<Props> = ({ elem }) => {
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
      await travelService.cancelTravelElementInstance(elem.id)
      dispatch(cancelTravelElementInstance(elem.id))
      toastUtils.Toast.showToast(
        toastUtils.types.SUCCESS,
        t('cancel_success'),
      )
    } catch (err) {
      toastUtils.Toast.showToast(
        toastUtils.types.ERROR,
        t('error'),
      )
    }
  }

  return (
    <Card
      sx={{
        backgroundColor: elem.passed ? alpha(green[500], 0.1) : alpha(theme.palette.grey[300], 0.2),
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
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight={700} color="text.primary">
            {elem.activity.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {new DateHandler(elem.from).format('DD-MM-YYYY')} -{' '}
            {new DateHandler(elem.to).format('DD-MM-YYYY')}
          </Typography>
        </Stack>

        <Typography variant="body1" color="text.secondary">
          {t('place')}:{' '}
          <Typography component="span" fontWeight={600} color="text.primary">
            {elem.activity.place}
          </Typography>
        </Typography>

        {elem.elementTravel && (
          <Typography variant="body1" color="text.secondary">
            {elem.elementTravel.description.split('\n').map((line) => (
              <React.Fragment key={line}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </Typography>
        )}

        {elem.passed && elem.photos.length > 0 && (
          <Stack
            direction="row"
            spacing={1}
            rowGap={1}
            flexWrap="wrap"
          >
            {elem.photos.slice(0, 5).map((photo, index) => (
              <Slider.Component
                key={photo}
                buttonComponent={(
                  <Box
                    key={photo}
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
                    {index === 4 && elem.photos.length > 5 && (
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
                          +{elem.photos.length - 5}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                )}
                images={elem.photos}
                startIndex={index}
              />
            ))}
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
          <RateActivity.Component
            elemId={elem.id}
            name={elem.activity.name}
          />

          {elem.passed ? (
            <Button
              variant="contained"
              color="primary"
              onClick={() => toastUtils.Toast.showToast(
                toastUtils.types.INFO,
                t('unavailable_fn'),
              )}
              startIcon={<QuestionAnswer />}
            >
              {t('answer_for_questions')}
            </Button>
          ) : (
            <Button
              variant="contained"
              color="error"
              onClick={cancelAccommodationElementInstanceFn}
              startIcon={<Cancel />}
            >
              {t('cancel')}
            </Button>
          )}
        </Stack>
      </Stack>
    </Card>
  )
}

export default GloballyElem
