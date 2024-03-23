import React from 'react'
import { useForm } from 'react-hook-form'
import { Button, Stack } from '@mui/material'
import {
  ActivityScope,
  ElementTravelInstance, locallyActivityTypes,
} from '../../model'
import * as Modal from '../UI/Modal'
import { useDependencies, useAuth } from '../../context'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { RootState } from '../../app/store'
import { putActivityInstance } from '../../features/travelInstance/travelInstanceSlice'
import { Pages } from '../../pages/pages'
import { ExtendedActivityFormat } from '../../services/backend/Activity/types'
import { DateHandler } from '../../utils/Date'
import { useRouter } from '../../hooks'
import * as Input from '../UI/Input'

type Props = {
  activity: ExtendedActivityFormat
  date: string
}

type Inputs = {
  from: string
  to: string
}

const SaveInstanceActivityModal: React.FC<Props> = (props) => {
  const { getToastUtils, getApiService } = useDependencies()
  const apiService = getApiService()
  const { token } = useAuth()
  const travelService = apiService.getTravel(token)
  const toastUtils = getToastUtils()
  const travelInstance = useAppSelector((state: RootState) => state.travelInstance)
  const dispatch = useAppDispatch()
  const activityScope: ActivityScope = locallyActivityTypes.includes(props.activity.activityType) ? 'Locally' : 'Globally'

  const {
    navigate,
  } = useRouter()

  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<Inputs>()

  const validateElemRange = () => {
    const fromInputValue = watch('from')
    const toInputValue = watch('to')

    if (!fromInputValue || !toInputValue) {
      return false
    }

    const setErrorMessage = () => {
      setError('to', { message: 'Aktywność nie może zakończyć się przed rozpoczęciem' })
    }

    const unsetErrorMessage = () => {
      clearErrors('to')
    }

    if (DateHandler.compareDates(fromInputValue, toInputValue) < 0) {
      setErrorMessage()
      return false
    }
    unsetErrorMessage()
    return true
  }

  const onSubmit = async (data: Inputs) => {
    if (!validateElemRange()) {
      return
    }
    const dateStart = activityScope === 'Locally'
      ? new DateHandler(`${props.date} ${data.from}`).toISOString()
      : new DateHandler(data.from).toISOString()

    const dateEnd = activityScope === 'Locally'
      ? new DateHandler(`${props.date} ${data.to}`).toISOString()
      : new DateHandler(data.to).toISOString()

    try {
      const result = await travelService.addActivityToTravelInstance(
        travelInstance.id.toString(),
        {
          activityId: props.activity.id,
          from: dateStart,
          to: dateEnd,
        },
      )
      const travelElement = new ElementTravelInstance({
        id: result.id,
        passed: false,
        photos: [],
        from: dateStart,
        to: dateEnd,
        activity: props.activity,
      })
      dispatch(putActivityInstance(travelElement))
      navigate(Pages.TAKING_TRIP_DAY.getRedirectLink({
        date: props.date,
      }))
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
            sx={{ width: '100%' }}
          >
            Dodaj do wycieczki
          </Button>
        )}
        title={props.activity.name}
        content={(
          <Stack
            gap={2}
          >
            <Input.Component
              variant={Input.Variant.OUTLINED}
              type={activityScope === 'Locally' ? Input.Type.TIME : Input.Type.DATE}
              label="Od"
              register={register}
              name="from"
              validation={['required']}
              error={errors.from?.message || ''}
            />

            <Input.Component
              variant={Input.Variant.OUTLINED}
              type={activityScope === 'Locally' ? Input.Type.TIME : Input.Type.DATE}
              label="Do"
              register={register}
              name="to"
              validation={['required']}
              error={errors.to?.message || ''}
            />
          </Stack>
        )}
        actions={[
          {
            name: 'Dodaj aktywność',
            onClick: handleSubmit(onSubmit),
            type: 'submit',
          },
        ]}
      />
    </form>
  )
}

export default SaveInstanceActivityModal
