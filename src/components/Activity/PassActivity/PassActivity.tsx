import React, {
  useEffect, useRef, useState,
} from 'react'
import { useForm } from 'react-hook-form'
import {
  Stack, Grid, useTheme, Box,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { LoadingButton } from '@mui/lab'
import TrashIcon from '@mui/icons-material/Delete'
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
  const imageInputRef = useRef<HTMLInputElement>(null)
  const [previewImages, setPreviewImages] = useState<string[]>([])

  const theme = useTheme()
  const {
    register, handleSubmit, setValue, watch,
  } = useForm<Inputs>({
    defaultValues: {
      images: [],
    },
  })
  const images = watch('images')

  useEffect(() => {
    const newPreviewImages = images.map((image: File) => URL.createObjectURL(image))
    setPreviewImages(newPreviewImages)
  }, [images])

  const handleRemove = (index: number) => {
    const newImages = images.filter((_, i) => i !== index)
    setValue('images', newImages)
  }

  const addImages = (files: File[]) => {
    const newImages = [
      ...images,
      ...files,
    ]

    setValue('images', newImages)
  }

  const onSubmit = async (data: Inputs) => {
    try {
      const result = await travelService.passTravelElement(props.travelElement.id, data)
      dispatch(passTravelElementInstance({
        id: props.travelElement.id,
        photos: result.urls,
      }))
    } catch (err) {
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
          >
            {t('pass')}
          </LoadingButton>
        )}
        title={t('pass')}
        content={(
          <Stack
            gap={2}
            sx={{
              width: 'min(70vw, 400px)',
            }}
          >
            <Grid
              container
              spacing={1}
              style={{
                minHeight: '100px',
                padding: '.5em',
                backgroundColor: theme.palette.grey[200],
              }}
            >
              {
                previewImages.map((url, index) => (
                  <Grid
                    item
                    key={url}
                    xs={4}
                  >
                    <Box
                      sx={{
                        position: 'relative',
                        '&:hover .hover-overlay': {
                          opacity: 1,
                        },
                      }}
                    >
                      <Box
                        className="hover-overlay"
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          backgroundColor: `${theme.palette.error.main}CD`,
                          opacity: 0,
                          transition: 'opacity 0.3s',
                          borderRadius: '5px',
                          zIndex: 1,
                          cursor: 'pointer',
                        }}
                        onClick={() => handleRemove(index)}
                      >
                        <Box
                          display="flex"
                          flexDirection="column"
                          alignItems="center"
                          justifyContent="center"
                          gap={1}
                          sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            color: theme.palette.common.white,
                            width: '100%',
                          }}
                        >
                          <TrashIcon
                            fontSize="large"
                          />
                        </Box>
                      </Box>

                      <Image.Component
                        alt=""
                        src={url}
                        style={{
                          width: '100%',
                          height: '100px',
                          objectFit: 'cover',
                          borderRadius: '5px',
                          position: 'relative',
                        }}
                      />
                    </Box>
                  </Grid>
                ))
              }
            </Grid>
            <input
              type="file"
              multiple
              hidden
              accept="image/*"
              {...register('images')}
              ref={imageInputRef}
              onChange={(e) => {
                if (e.target.files) {
                  const arrayFiles = Array.from(e.target.files)
                  addImages(arrayFiles)
                }
              }}
            />
          </Stack>
        )}
        actions={[
          {
            name: t('add_photos'),
            type: 'button',
            onClick: () => {
              imageInputRef.current?.click()
            },
          },
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
