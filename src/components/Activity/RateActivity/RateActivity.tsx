import React from 'react'
import {
  Button,
  Checkbox, FormControlLabel, Stack,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Grade } from '@mui/icons-material'
import { useDependencies, useAuth } from '../../../context'
import * as Modal from '../../../components/UI/Modal'
import * as Input from '../../../components/UI/Input'
import { Rating } from '../../../model'
import { useFetch } from '../../../hooks'

type Props = {
  elemId: number
  name: string
}

type Inputs = {
  text: string
  sharePhotos: boolean,

}

const RateActivity: React.FC<Props> = (props) => {
  const { getApiService, getToastUtils } = useDependencies()
  const { token } = useAuth()
  const toastUtils = getToastUtils()
  const apiService = getApiService()
  const ratingService = apiService.getRating(token)
  const { t } = useTranslation('translation', { keyPrefix: 'activity.rating' })

  const {
    register, handleSubmit,
  } = useForm<Inputs>()

  const fetchData = async () => ratingService.getRating(props.elemId)

  const {
    data: rating,
  } = useFetch<Rating>({
    fetchData,
    defaultData: undefined,
  })

  const onSubmit = async (data: Inputs) => {
    try {
      await ratingService.putRating({
        text: data.text,
        sharePhotos: data.sharePhotos,
        elementTravelId: props.elemId,
      })
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
            onClick: handleSubmit(onSubmit),
          },
        ]}
      >
        <Stack>
          <Input.Component
            variant={Input.Variant.OUTLINED}
            type={Input.Type.TEXT}
            label={t('your_opinion')}
            rows={10}
            register={register}
            name="text"
            validation={['min:3', 'max:1000']}
            default={rating && rating.text}
          />

          <FormControlLabel
            control={<Checkbox />}
            label={t('share_photos')}
            {...register('sharePhotos')}
          />
        </Stack>
      </Modal.Component>
    </form>
  )
}

export default RateActivity
