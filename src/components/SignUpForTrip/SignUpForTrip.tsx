import React from 'react'
import { Button, Stack } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import * as Modal from '../UI/Modal'
import * as Input from '../UI/Input'
import { PlanATravelDto } from '../../services/backend/Travel/dto'
import { Pages } from '../../pages/pages'
import { useDependencies, useAuth } from '../../context'
import { useRouter } from '../../hooks'

type ModalInputs = {
  startDate: Date,
}

type Props = {
  id: number
  name: string
}

const SignUpForTrip: React.FC<Props> = (props) => {
  const {
    navigate,
  } = useRouter()

  const { getApiService, getToastUtils } = useDependencies()
  const toastUtils = getToastUtils()
  const apiService = getApiService()
  const { token } = useAuth()
  const travelService = apiService.getTravel(token)
  const { t } = useTranslation('translation', { keyPrefix: 'sign_up_for_trip' })

  const {
    register, handleSubmit,
  } = useForm<ModalInputs>()

  const onSubmit = async (data: ModalInputs) => {
    try {
      const payload: PlanATravelDto = {
        travelRecipeId: props.id,
        startDate: data.startDate,
      }
      const result = await travelService.createATravelInstance(payload)
      navigate(Pages.TAKING_TRIP.getRedirectLink({
        id: result.id.toString(),
      }))
    } catch (e) {
      toastUtils.Toast.showToast(
        toastUtils.types.ERROR,
        t('error'),
      )
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
    >
      <Modal.Component
        buttonComponent={(
          <Button
            type="button"
            variant="contained"
            color="primary"
            style={{ width: '100%' }}
            onClick={() => {}}
          >
            {t('go_to_travel')}
          </Button>
        )}
        title={`${t('save_to_travel')}: ${props.name}`}
        content={(
          <Stack
            sx={{
              maxWidth: 'min(70vw, 400px)',
            }}
          >
            <Input.Component
              variant={Input.Variant.OUTLINED}
              type={Input.Type.DATE}
              label={t('start_date')}
              register={register}
              name="startDate"
            />
          </Stack>
        )}
        actions={[
          {
            name: t('go_to_travel'),
            type: 'submit',
            onClick: handleSubmit(onSubmit),
          },
        ]}
      />
    </form>
  )
}

export default SignUpForTrip
