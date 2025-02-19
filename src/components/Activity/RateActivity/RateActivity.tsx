import React, { useEffect } from 'react'
import {
  Button,
  Stack,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Grade } from '@mui/icons-material'
import { useDependencies, useAuth } from '../../../context'
import * as Modal from '../../../components/UI/Modal'
import * as Input from '../../../components/UI/Input'
import { Rating } from '../../../model'
import { useFetch } from '../../../hooks'
import * as Dropzone from '../../UI/Dropzone'
import * as StarRating from '../../UI/StarRating'
import { useAppDispatch } from '../../../app/hooks'
import { updateImagesForElementInstance } from '../../../features/travelInstance/travelInstanceSlice'

type Props = {
  elemId: number
  name: string
}

type Inputs = {
  text: string
  rating: number
}

const RateActivity: React.FC<Props> = (props) => {
  const { getApiService, getToastUtils } = useDependencies()
  const { token } = useAuth()
  const toastUtils = getToastUtils()
  const apiService = getApiService()
  const ratingService = apiService.getRating(token)
  const { t } = useTranslation('translation', { keyPrefix: 'activity.rating' })
  const dispatch = useAppDispatch()

  const fetchData = async () => ratingService.getRating(props.elemId)

  const {
    data: rating,
    setData: setRating,
  } = useFetch<Rating>({
    fetchData,
    defaultData: undefined,
  })

  const [photosToAdd, setPhotosToAdd] = React.useState<File[]>([])
  const [photosToDelete, setPhotosToDelete] = React.useState<number[]>([])
  const [dropzoneValue, setDropzoneValue] = React.useState<(string | File)[]>([])

  useEffect(() => {
    const existingUrls = (rating?.photos || [])
      .filter((photo) => !photosToDelete.includes(photo.id))
      .map((photo) => photo.url)
    setDropzoneValue([...existingUrls, ...photosToAdd])
  }, [rating, photosToDelete, photosToAdd])

  const handleAddFiles = (files: File[]) => {
    setPhotosToAdd((prev) => [...prev, ...files])
  }

  const handleDeleteItem = (item: string | File) => {
    if (typeof item === 'string') {
      const photo = rating?.photos.find((p) => p.url === item)
      if (photo) setPhotosToDelete((prev) => [...prev, photo.id])
    } else {
      setPhotosToAdd((prev) => prev.filter((file) => file !== item))
    }
  }

  const {
    register,
    handleSubmit,
    control,
    reset,
    trigger,
  } = useForm<Inputs>()

  const resetForm = () => {
    reset({
      text: rating?.text || '',
      rating: rating?.rating || 0,
    })

    setPhotosToAdd([])
    setPhotosToDelete([])
  }

  const onSubmit = async (data: Inputs) => {
    try {
      const ratingResponse = await ratingService.putRating({
        text: data.text,
        elementTravelId: props.elemId,
        rating: data.rating,
        photosToAdd,
        photosToDelete,
      })
      setRating(ratingResponse)

      dispatch(updateImagesForElementInstance({
        id: props.elemId,
        photos: ratingResponse.photos.map((photo) => photo.url),
      }))
      toastUtils.Toast.showToast(
        toastUtils.types.INFO,
        t('saved'),
      )
    } catch (err) {
      toastUtils.Toast.showToast(
        toastUtils.types.ERROR,
        t('error'),
      )
    }
  }

  const handleSubmission = async () => {
    const isValid = await trigger()
    if (!isValid) {
      throw new Error('Form is not valid')
    }
    await handleSubmit(onSubmit)()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Modal.Component
        buttonComponent={(
          <Button
            type="button"
            variant="contained"
            color="primary"
            startIcon={<Grade />}
            sx={{ width: '100% !important' }}
          >
            {t('rate')}
          </Button>
        )}
        title={`${t('rate')} "${props.name}"`}
        actions={[
          {
            name: t('add_rating'),
            type: 'submit',
            onClick: handleSubmission,
            hideAfterClick: true,
          },
        ]}
        sx={{
          width: 'min(70vw, 400px)',
          maxHeight: '90vh',
          overflow: 'auto',
        }}
        onClose={resetForm}
      >
        <Stack
          gap={2}
        >
          <Stack
            gap={2}
          >
            <StarRating.Component
              name="rating"
              label={t('rate_scale')}
              control={control}
              required
              size="large"
              defaultValue={rating && rating.rating}
            />

            <Input.Component
              variant={Input.Variant.OUTLINED}
              type={Input.Type.TEXT}
              label={t('your_opinion')}
              rows={5}
              register={register}
              name="text"
              default={rating && rating.text}
            />
          </Stack>

          <Stack>
            <Dropzone.Component
              label={t('add_photos')}
              name="activity-photos"
              accept="image/*"
              value={dropzoneValue}
              onAdd={handleAddFiles}
              onDelete={handleDeleteItem}
            />
          </Stack>
        </Stack>
      </Modal.Component>
    </form>
  )
}

export default RateActivity
