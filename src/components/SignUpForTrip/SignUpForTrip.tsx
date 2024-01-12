import React from 'react'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import * as Modal from '../UI/Modal'
import * as Input from '../UI/Input'
import { PlanATravelDto } from '../../services/backend/Travel/dto'
import { Pages } from '../../pages/pages'
import { useDependencies } from '../../context/dependencies'
import { useAuth } from '../../context/auth'

type ModalInputs = {
  startDate: Date,
}

type Props = {
  id: string
  name: string
}

const SignUpForTrip: React.FC<Props> = (props) => {
  const { getApiService, getToastUtils } = useDependencies()
  const toastUtils = getToastUtils()
  const apiService = getApiService()
  const { token } = useAuth()
  const travelService = apiService.getTravel(token)
  const navigate = useNavigate()

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
        'Wystąpił nieoczekiwany błąd',
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
            Wybierz się na wycieczkę
          </Button>
        )}
        title={`Zapisz się na wycieczkę ${props.name}`}
        content={(
          <Input.Component
            variant={Input.Variant.OUTLINED}
            type={Input.Type.DATE}
            label="Podaj datę początkową"
            register={register}
            name="startDate"
          />
        )}
        actions={[
          {
            name: 'Wybierz się na wycieczkę',
            type: 'submit',
            onClick: handleSubmit(onSubmit),
          },
        ]}
      />
    </form>
  )
}

export default SignUpForTrip
