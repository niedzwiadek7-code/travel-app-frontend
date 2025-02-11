import React, { ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import {
  Stack,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { LoadingButton } from '@mui/lab'
import { ElementTravelInstance } from '../../../model'
import * as Modal from '../../../components/UI/Modal'
import { useDependencies, useAuth } from '../../../context'
import { useAppDispatch } from '../../../app/hooks'
import { passTravelElementInstance } from '../../../features/travelInstance/travelInstanceSlice'
import * as Dropzone from '../../UI/Dropzone'

type Props = {
  travelElement: ElementTravelInstance
  button: ReactNode
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

  const {
    register, handleSubmit, setValue, watch,
  } = useForm<Inputs>({
    defaultValues: {
      images: [],
    },
  })
  const images = watch('images')

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
        buttonComponent={props.button}
        title={t('pass')}
        actions={[
          {
            name: t('pass'),
            type: 'submit',
            onClick: handleSubmit(onSubmit),
          },
        ]}
        sx={{
          width: 'min(70vw, 400px)',
        }}
      >
        <Stack>
          <Dropzone.Component
            name="images"
            register={register}
            accept="image/*"
            value={images}
            onChange={(files) => {
              setValue('images', files)
            }}
          />
        </Stack>
      </Modal.Component>
    </form>
  )
}

export default PassElementTravelModal
