import React, { useEffect } from 'react'
import {
  Button, Stack,
} from '@mui/material'
import { LocalizationProvider, SingleInputTimeRangeField } from '@mui/x-date-pickers-pro'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import dayjs from 'dayjs'
import * as Modal from '../UI/Modal'
import * as Input from '../UI/Input'
import {
  Activity as ActivityEntity,
  Date,
  Date as DateEntity,
  TravelElement,
  ActivityTypes,
  AccommodationElement,
} from '../../model'
import { useDependencies } from '../../context/dependencies'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { putAccommodation, putActivity } from '../../features/travelRecipe/travelRecipeSlice'
import { Pages } from '../../pages/pages'
import { RootState } from '../../app/store'

type Props = {
  activity: ActivityEntity
  countDay: string
}

type Inputs = {
  times: string
  numberOfDays: number
  numberOfPeople: number
  price: string
  description: string
}

const SaveActivityModal: React.FC<Props> = (props) => {
  const travelRecipe = useAppSelector((state: RootState) => state.travelRecipe)
  const { getToastUtils } = useDependencies()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const toastUtils = getToastUtils()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
  } = useForm<Inputs>()

  useEffect(() => {
    if (props.activity.price) {
      if (props.activity.priceType && props.activity.priceType === 'per_hour') {
        return
      }
      setValue('price', props.activity.price.toString())
    }
  }, [])

  const calculatePriceForActivity = (datesRange: any[]) => {
    if (
      datesRange[0] && datesRange[1]
      && props.activity.priceType && props.activity.priceType === 'per_hour'
    ) {
      const dateStart = new DateEntity(datesRange[0]?.toString())
      const dateEnd = new DateEntity(datesRange[1]?.toString())
      if (DateEntity.compareDates(dateEnd, dateStart) > 0) {
        const numberOfPeople = watch('numberOfPeople') > 1 ? watch('numberOfPeople') : 1
        setValue(
          'price',
          (Math.ceil(Date.timeDiff(dateStart, dateEnd) / 60)
            * props.activity.price * numberOfPeople).toString(),
        )
      }
    }
  }

  const calculatePriceForActivityButAfterNumberOfPeopleChange = () => {
    if (props.activity.priceType && props.activity.priceType === 'per_hour') {
      return
    }

    const numberOfPeople = watch('numberOfPeople')
    if (numberOfPeople > 1) {
      setValue('price', (props.activity.price * numberOfPeople).toString())
    }
  }

  const calculatePriceForAccommodation = (numberOfDays: number) => {
    if (numberOfDays > 1) {
      setValue('price', (numberOfDays * props.activity.price).toString())
    }
  }

  const onSubmit = (data: Inputs) => {
    let dateStart: Date | undefined
    let dateEnd: Date | undefined

    if (data.times) {
      const createDateStr = (date: string) => {
        const [hours, minutes] = date.split(':')
        return dayjs()
          .set('hour', parseInt(hours, 10))
          .set('minute', parseInt(minutes, 10))
          .toString()
      }

      const dates = data.times.split(' – ')
      dateStart = new DateEntity(createDateStr(dates[0]))
      dateEnd = new DateEntity(createDateStr(dates[1]))

      if (!data.times[0] || !data.times[1]) {
        toastUtils.Toast.showToast(
          toastUtils.types.ERROR,
          'Podane godziny są niepoprawne',
        )
        return
      }

      if (DateEntity.compareDates(dateEnd, dateStart) < 0) {
        toastUtils.Toast.showToast(
          toastUtils.types.ERROR,
          'Czas rozpoczęcia aktywności musi być wcześniejszy niż czas jej zakończenia',
        )
        return
      }
    }

    switch (props.activity.activityType) {
      case ActivityTypes.ACCOMMODATION:
        dispatch(putAccommodation(new AccommodationElement({
          id: uuidv4(),
          numberOfDays: data.numberOfDays,
          description: data.description,
          price: parseInt(data.price, 10),
          accommodation: props.activity,
        })))
        if (travelRecipe.id) {
          navigate(Pages.EDIT_TRAVEL.getRedirectLink({
            id: travelRecipe.id.toString(),
          }))
        } else {
          navigate(Pages.CREATE_TRAVEL.getRedirectLink())
        }
        break
      default:
        dispatch(putActivity(new TravelElement({
          id: uuidv4(),
          dayCount: parseInt(props.countDay, 10),
          from: dateStart,
          to: dateEnd,
          activity: props.activity,
          price: parseInt(data.price, 10),
          numberOfPeople: data.numberOfPeople || undefined,
          description: data.description,
          numberOfDays: data.numberOfDays,
        })))
        navigate(Pages.TRAVEL_DAY.getRedirectLink({
          countDay: props.countDay,
        }))
        break
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

            {
              props.activity.activityType === ActivityTypes.ACCOMMODATION ? (
                <Input.Component
                  variant={Input.Variant.OUTLINED}
                  type={Input.Type.NUMBER}
                  label="Ilość dni"
                  register={register}
                  name="numberOfDays"
                  validation={['required']}
                  onChange={calculatePriceForAccommodation}
                />
              ) : (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['SingleInputTimeRangeField']}>
                    <SingleInputTimeRangeField
                      ampm={false}
                      label="Zaplanuj w terminie"
                      {...register('times')}
                      onChange={calculatePriceForActivity}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              )
            }

            {
              (props.activity.price || props.activity.price === 0)
              && props.activity.activityType !== ActivityTypes.ACCOMMODATION
              && (
                <Input.Component
                  variant={Input.Variant.OUTLINED}
                  type={Input.Type.NUMBER}
                  label="Ilość osób"
                  register={register}
                  name="numberOfPeople"
                  validation={['required']}
                  onChange={calculatePriceForActivityButAfterNumberOfPeopleChange}
                />
              )
            }

            <Input.Component
              variant={Input.Variant.OUTLINED}
              type={Input.Type.TEXT}
              label="Dodatkowe informacje"
              rows={4}
              register={register}
              name="description"
            />

            <Input.Component
              variant={Input.Variant.OUTLINED}
              type={Input.Type.NUMBER}
              label="Cena całkowita"
              register={register}
              name="price"
              validation={['required']}
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

export default SaveActivityModal
