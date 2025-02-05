import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  Button, Stack, Grid, useTheme,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { LoadingButton } from '@mui/lab'
import { ElementTravelInstance } from '../../../model'
import * as Modal from '../../../components/UI/Modal'
import { useDependencies, useAuth } from '../../../context'
import { useAppDispatch } from '../../../app/hooks'
import { passTravelElementInstance } from '../../../features/travelInstance/travelInstanceSlice'
import * as Image from '../../UI/Image'

type Props = {
  travelElement: ElementTravelInstance
}

type Inputs = {
  images: File[]
}

const PassElementTravelModal: React.FC<Props> = (props) => {
  const dispatch = useAppDispatch()
  const { getApiService, getToastUtils } = useDependencies()
  const toastUtils = getToastUtils()
  const apiService = getApiService()
  const { token } = useAuth()
  const travelService = apiService.getTravel(token)
  const { t } = useTranslation('translation', { keyPrefix: 'activity.pass' })
  const [loading, setLoading] = useState<boolean>(false)

  const theme = useTheme()
  const {
    register, handleSubmit, setValue,
  } = useForm<Inputs>()
  const [urls, setUrls] = useState<string[]>([])

  const onSubmit = async (data: Inputs) => {
    try {
      setLoading(true)
      const result = await travelService.passTravelElement(props.travelElement.id, data)
      dispatch(passTravelElementInstance({
        id: props.travelElement.id,
        photos: result.urls,
      }))
      setLoading(false)
    } catch (err) {
      console.log(err)
      toastUtils.Toast.showToast(
        toastUtils.types.ERROR,
        t('error'),
      )
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Modal.Component
        buttonComponent={(
          <LoadingButton
            type="button"
            variant="contained"
            color="success"
            loading={loading}
          >
            {t('pass')}
          </LoadingButton>
        )}
        title={t('pass')}
        content={(
          <Stack
            gap={2}
          >
            {
              urls.length > 0 && (
                <Grid
                  container
                  spacing={2}
                  style={{
                    padding: '1em',
                    backgroundColor: theme.palette.grey[200],
                  }}
                >
                  {
                    urls.map((url) => (
                      <Grid
                        item
                        key={url}
                        xs={4}
                      >
                        <Image.Component
                          alt=""
                          src={url}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: '5px',
                          }}
                        />
                      </Grid>
                    ))
                  }
                </Grid>
              )
            }
            <Button
              variant="contained"
              component="label"
            >
              {t('add_photos')}
              <input
                type="file"
                multiple
                hidden
                {...register('images')}
                onChange={(e) => {
                  if (e.target.files) {
                    const arrayFiles = Array.from(e.target.files)
                    setValue('images', arrayFiles)
                    const urlsTemp = arrayFiles.map(
                      (file) => URL.createObjectURL(file),
                    )
                    setUrls(urlsTemp)
                  }
                }}
              />
            </Button>
          </Stack>
        )}
        actions={[
          {
            name: t('pass'),
            type: 'submit',
            onClick: handleSubmit(onSubmit),
          },
        ]}
      />
    </form>
  )
}

export default PassElementTravelModal
