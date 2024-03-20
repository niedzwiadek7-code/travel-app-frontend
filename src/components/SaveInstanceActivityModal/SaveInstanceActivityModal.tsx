import React from 'react'
import { useForm } from 'react-hook-form'
import { Button, Stack } from '@mui/material'
import { LocalizationProvider, SingleInputTimeRangeField } from '@mui/x-date-pickers-pro'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { useNavigate } from 'react-router-dom'
import {
  Date as DateEntity,
  ElementTravelInstance,
} from '../../model'
import * as Modal from '../UI/Modal'
import { useDependencies, useAuth } from '../../context'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { RootState } from '../../app/store'
import { putActivityInstance } from '../../features/travelInstance/travelInstanceSlice'
import { Pages } from '../../pages/pages'
import { ExtendedActivityFormat } from '../../services/backend/Activity/types'

// TODO: handle accommodations here

dayjs.extend(utc)

type Props = {
  activity: ExtendedActivityFormat
  date: string
}

type Inputs = {
  times: string
}

const SaveInstanceActivityModal: React.FC<Props> = (props) => {
  const { getToastUtils, getApiService } = useDependencies()
  const apiService = getApiService()
  const { token } = useAuth()
  const travelService = apiService.getTravel(token)
  const toastUtils = getToastUtils()
  const travelInstance = useAppSelector((state: RootState) => state.travelInstance)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
  } = useForm<Inputs>()

  const onSubmit = async (data: Inputs) => {
    if (!data.times[0] || !data.times[1]) {
      toastUtils.Toast.showToast(
        toastUtils.types.ERROR,
        'Podane godziny są niepoprawne',
      )
      return
    }

    const createDateStr = (date: string) => {
      const [hours, minutes] = date.split(':')
      return dayjs(dayjs.utc(props.date)
        .set('hour', parseInt(hours, 10))
        .set('minute', parseInt(minutes, 10))).utc()
    }

    const dates = data.times.split(' – ')
    const dateStartObj = createDateStr(dates[0])
    const dateEndObj = createDateStr(dates[1])
    const dateStart = new DateEntity(dateStartObj.toString())
    const dateEnd = new DateEntity(dateEndObj.toString())

    if (DateEntity.compareDates(dateEnd, dateStart) < 0) {
      toastUtils.Toast.showToast(
        toastUtils.types.ERROR,
        'Czas rozpoczęcia aktywności musi być wcześniejszy niż czas jej zakończenia',
      )
    }

    try {
      const result = await travelService.addActivityToTravelInstance(
        travelInstance.id.toString(),
        {
          activityId: props.activity.id,
          from: dateStartObj.toISOString(),
          to: dateEndObj.toISOString(),
        },
      )
      const travelElement = new ElementTravelInstance({
        id: result.id,
        passed: false,
        photos: [],
        from: dateStartObj.toISOString(),
        to: dateEndObj.toISOString(),
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
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['SingleInputTimeRangeField']}>
                <SingleInputTimeRangeField
                  ampm={false}
                  label="Zaplanuj w terminie"
                  {...register('times')}
                  onChange={() => {}}
                />
              </DemoContainer>
            </LocalizationProvider>
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
