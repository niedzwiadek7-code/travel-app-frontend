import React, { ReactNode } from 'react'
import {
  Stack,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'
import { useTranslation } from 'react-i18next'
import * as Modal from '../UI/Modal'
import * as Input from '../UI/Input'
import {
  LocallyTravelElement,
  GloballyTravelElement,
  locallyActivityTypes, ActivityScope,
} from '../../model'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { putActivity } from '../../features/travelRecipe/travelRecipeSlice'
import { Pages } from '../../pages/pages'
import { RootState } from '../../app/store'
import { ExtendedActivityFormat } from '../../services/backend/Activity/types'
import { DateHandler, DateType } from '../../utils/Date'
import { useRouter } from '../../hooks'

type Props = {
  button: ReactNode,
  travelElement?: LocallyTravelElement | GloballyTravelElement
  activity: ExtendedActivityFormat
  countDay: string
}

type Inputs = {
  times: string
  from: string
  to: string
  numberOfPeople: number
  price: number
  description: string
}

const SaveActivityModal: React.FC<Props> = (props) => {
  const {
    navigate,
  } = useRouter()
  const travelRecipe = useAppSelector((state: RootState) => state.travelRecipe)
  const dispatch = useAppDispatch()
  const activityScope: ActivityScope = locallyActivityTypes.includes(props.activity.activityType) ? 'Locally' : 'Globally'
  const { t } = useTranslation('translation', { keyPrefix: 'activity_page.add_to_trip' })

  const {
    register,
    handleSubmit,
    setValue,
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
      setError('to', { message: t('activity_not_end_before_start') })
    }

    const unsetErrorMessage = () => {
      clearErrors('to')
    }

    switch (activityScope) {
      case 'Locally':
        if (DateHandler.compareDates(fromInputValue, toInputValue) < 0) {
          setErrorMessage()
          return false
        }
        unsetErrorMessage()
        return true
      case 'Globally':
        if (fromInputValue > toInputValue) {
          setErrorMessage()
          return false
        }
        unsetErrorMessage()
        return true
      default:
        return false
    }
  }

  const calculatePriceForActivity = () => {
    const from = new DateHandler(watch('from')).format('HH:mm')
    const to = new DateHandler(watch('to')).format('HH:mm')
    const numberOfPeople = watch('numberOfPeople') > 1 ? watch('numberOfPeople') : 1
    const diff = DateHandler.diff(to, from, 'hours')

    if (props.activity.priceType === 'per_hour') {
      setValue('price', (diff * props.activity.price * numberOfPeople))
      return
    }

    if (props.activity.price) {
      setValue('price', props.activity.price * numberOfPeople)
    }
  }

  const calculatePriceForGloballyElem = () => {
    const from = parseInt(watch('from'), 10)
    const to = parseInt(watch('to'), 10)
    const numberOfDays = to - from + 1

    if (numberOfDays >= 1 && props.activity.price) {
      setValue('price', (numberOfDays * props.activity.price))
    }
  }

  const calculatePrice = () => {
    if (!validateElemRange()) {
      return
    }

    switch (activityScope) {
      case 'Locally':
        calculatePriceForActivity()
        break
      case 'Globally':
        calculatePriceForGloballyElem()
        break
      default:
        break
    }
  }

  const getDefaultRangeProp = (prop: string | DateType | undefined) => {
    if (!prop) {
      return undefined
    }

    if (activityScope === 'Locally') {
      return new DateHandler(prop).format('HH:mm')
    }

    return prop.toString()
  }

  const onSubmit = (data: Inputs) => {
    if (!validateElemRange()) {
      return
    }

    switch (activityScope) {
      case 'Globally':
        dispatch(putActivity(
          new GloballyTravelElement({
            id: props.travelElement?.id || uuidv4(),
            from: parseInt(data.from, 10),
            to: parseInt(data.to, 10),
            numberOfPeople: data.numberOfPeople,
            price: data.price,
            description: data.description,
            photos: [],
            activity: props.activity,
          }),
        ))
        if (travelRecipe.id) {
          navigate(Pages.EDIT_TRAVEL.getRedirectLink({
            id: travelRecipe.id.toString(),
          }))
        } else {
          navigate(Pages.CREATE_TRAVEL.getRedirectLink())
        }
        break
      case 'Locally':
        dispatch(putActivity(new LocallyTravelElement({
          id: props.travelElement?.id || uuidv4(),
          dayCount: parseInt(props.countDay, 10),
          from: new DateHandler(data.from).format('HH:mm'),
          to: new DateHandler(data.to).format('HH:mm'),
          activity: props.activity,
          price: data.price,
          numberOfPeople: data.numberOfPeople,
          description: data.description,
          photos: [],
        })))
        navigate(Pages.TRAVEL_DAY.getRedirectLink({
          countDay: props.countDay,
        }))
        break
      default:
        break
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Modal.Component
        buttonComponent={props.button}
        title={`${t('details')}: ${props.activity.name}`}
        actions={[
          {
            name: props.travelElement ? t('edit') : t('create'),
            onClick: handleSubmit(onSubmit),
            type: 'submit',
          },
        ]}
      >
        <Stack
          gap={2}
          sx={{
            width: 'min(70vw, 400px)',
          }}
        >
          <Input.Component
            variant={Input.Variant.OUTLINED}
            type={activityScope === 'Locally' ? Input.Type.TIME : Input.Type.NUMBER}
            label={t('from')}
            register={register}
            name="from"
            default={getDefaultRangeProp(props.travelElement?.from)}
            validation={[
              'required',
              ...(activityScope === 'Globally'
                ? ['minNum:1', `maxNum:${travelRecipe.countDays}`]
                : []
              ),
            ]}
            onChange={calculatePrice}
            error={errors.from?.message || ''}
          />

          <Input.Component
            variant={Input.Variant.OUTLINED}
            type={activityScope === 'Locally' ? Input.Type.TIME : Input.Type.NUMBER}
            label={t('to')}
            register={register}
            name="to"
            default={getDefaultRangeProp(props.travelElement?.to)}
            validation={[
              'required',
              ...(activityScope === 'Globally'
                ? ['minNum:1', `maxNum:${travelRecipe.countDays}`]
                : []
              ),
            ]}
            onChange={calculatePrice}
            error={errors.to?.message || ''}
          />

          {/* TODO: move number of people to travel recipe class */}
          <Input.Component
            variant={Input.Variant.OUTLINED}
            type={Input.Type.NUMBER}
            label={t('people')}
            register={register}
            default={props.travelElement?.numberOfPeople}
            name="numberOfPeople"
            validation={['required']}
            onChange={calculatePrice}
            error={errors.numberOfPeople?.message || ''}
          />

          <Input.Component
            variant={Input.Variant.OUTLINED}
            type={Input.Type.TEXT}
            label={t('additional_info')}
            rows={Infinity}
            register={register}
            default={props.travelElement?.description}
            name="description"
            error={errors.description?.message || ''}
          />

          <Input.Component
            variant={Input.Variant.OUTLINED}
            type={Input.Type.NUMBER}
            label={t('price')}
            register={register}
            default={props.travelElement?.price || 0}
            name="price"
            validation={['required', 'minNum:0']}
            error={errors.price?.message || ''}
          />
        </Stack>
      </Modal.Component>
    </form>
  )
}

export default SaveActivityModal
