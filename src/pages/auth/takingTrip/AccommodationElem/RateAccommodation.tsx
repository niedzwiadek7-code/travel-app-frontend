import React, { useEffect, useState } from 'react'
import {
  Button, Checkbox, FormControlLabel, Stack,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { useDependencies } from '../../../../context/dependencies'
import { useAuth } from '../../../../context/auth'
import * as Modal from '../../../../components/UI/Modal'
import * as Input from '../../../../components/UI/Input'
import { ActivityTypes } from '../../../../model'
import AccommodationRating from '../../../../model/AccommodationRating'

type Props = {
  elemId: string
  name: string
}

type Inputs = {
  text: string
  sharePhotos: boolean,
}

const RateAccommodation: React.FC<Props> = (props) => {
  const { getApiService, getToastUtils } = useDependencies()
  const { token } = useAuth()
  const toastUtils = getToastUtils()
  const apiService = getApiService()
  const ratingService = apiService.getRating(token)
  const [rating, setRating] = useState<AccommodationRating | undefined>(undefined)

  const {
    register, handleSubmit,
  } = useForm<Inputs>()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setRating(
          await ratingService.getAccommodationRating(props.elemId),
        )
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [])

  const onSubmit = async (data: Inputs) => {
    try {
      await ratingService.putAccommodationRating({
        activityType: ActivityTypes.ACCOMMODATION,
        text: data.text,
        sharePhotos: data.sharePhotos,
        elementTravelId: props.elemId.toString(),
      })
      toastUtils.Toast.showToast(
        toastUtils.types.INFO,
        'Twoja ocena została zapisana',
      )
    } catch (err) {
      toastUtils.Toast.showToast(
        toastUtils.types.ERROR,
        'Wystąpił nieoczekiwany błąd',
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
          >
            Oceń aktywność
          </Button>
        )}
        title={`Oceń aktywność "${props.name}"`}
        content={(
          <Stack>
            <Input.Component
              variant={Input.Variant.OUTLINED}
              type={Input.Type.TEXT}
              label="Twoja opinia"
              rows={4}
              register={register}
              name="text"
              validation={['min:3', 'max:1000']}
              default={rating && rating.text}
            />

            <FormControlLabel
              control={<Checkbox />}
              label="Pochwal się zdjęciami z innymi użytkownikami"
              {...register('sharePhotos')}
            />
          </Stack>
        )}
        actions={[
          {
            name: 'Dodaj ocenę',
            type: 'submit',
            onClick: handleSubmit(onSubmit),
          },
        ]}
      />
    </form>
  )
}

export default RateAccommodation
