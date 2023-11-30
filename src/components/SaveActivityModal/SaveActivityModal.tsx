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
  Activity as ActivityEntity, Date, Date as DateEntity, TravelElement,
} from '../../model'
import { useDependencies } from '../../context/dependencies'
import { useAppDispatch } from '../../app/hooks'
import { putActivity } from '../../features/travelRecipe/travelRecipeSlice'
import { Pages } from '../../pages/pages'

type Props = {
  activity: ActivityEntity
  countDay: string
}

type Inputs = {
  dates: string
  numberOfPeople: number
  price: number
  description: string
}

const SaveActivityModal: React.FC<Props> = (props) => {
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
      setValue('price', props.activity.price)
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
          Math.ceil(Date.timeDiff(dateStart, dateEnd) / 60) * props.activity.price * numberOfPeople,
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
      setValue('price', props.activity.price * numberOfPeople)
    }
  }

  const onSubmit = (data: Inputs) => {
    const dates = data.dates.split(' – ')

    if (!data.dates[0] || !data.dates[1]) {
      toastUtils.Toast.showToast(
        toastUtils.types.ERROR,
        'Podane godziny są niepoprawne',
      )
    }

    const createDateStr = (date: string) => {
      const [hours, minutes] = date.split(':')
      return dayjs()
        .set('hour', parseInt(hours, 10))
        .set('minute', parseInt(minutes, 10))
        .toString()
    }

    const dateStart = new DateEntity(createDateStr(dates[0]))
    const dateEnd = new DateEntity(createDateStr(dates[1]))

    if (DateEntity.compareDates(dateEnd, dateStart) < 0) {
      toastUtils.Toast.showToast(
        toastUtils.types.ERROR,
        'Czas rozpoczęcia aktywności musi być wcześniejszy niż czas jej zakończenia',
      )
      return
    }

    const travelElement = new TravelElement({
      id: uuidv4(),
      dayCount: parseInt(props.countDay, 10),
      from: dateStart,
      to: dateEnd,
      activity: props.activity,
      price: data.price,
      numberOfPeople: data.numberOfPeople || undefined,
      description: data.description,
    })
    dispatch(putActivity(travelElement))
    navigate(Pages.TRAVEL_DAY.getRedirectLink({
      countDay: props.countDay,
    }))
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
            Skorzystaj z oferty
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
                  {...register('dates')}
                  onChange={calculatePriceForActivity}
                />
              </DemoContainer>
            </LocalizationProvider>

            {
              props.activity.price && (
                <Input.Component
                  variant={Input.Variant.OUTLINED}
                  type={Input.Type.NUMBER}
                  label="Ilość osób"
                  data={register('numberOfPeople')}
                  onChange={calculatePriceForActivityButAfterNumberOfPeopleChange}
                />
              )
            }

            <Input.Component
              variant={Input.Variant.OUTLINED}
              type={Input.Type.TEXT}
              label="Dodatkowe informacje"
              data={register('description')}
            />

            <Input.Component
              variant={Input.Variant.OUTLINED}
              type={Input.Type.NUMBER}
              label="Cena całkowita"
              data={register('price')}
            />
          </Stack>
        )}
        actions={[
          {
            name: 'Dodaj do wycieczki',
            type: 'submit',
            onClick: handleSubmit(onSubmit),
          },
        ]}
      />
    </form>
  )
}

export default SaveActivityModal
