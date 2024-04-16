import React, { useState } from 'react'
import {
  Button, Stack,
} from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { DownhillSkiing } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { useTranslation } from 'react-i18next'
import * as Select from '../../../../components/UI/Select'
import InputsMap from './InputsMap'
import * as Input from '../../../../components/UI/Input'
import { useDependencies, useAuth } from '../../../../context'
import { Pages } from '../../../pages'
import * as Loading from '../../../../components/UI/Loading'
import SaveActivityModal from './SaveActivityModal'
import * as SaveInstanceActivityModal from '../../../../components/SaveInstanceActivityModal'
import * as Header from '../../../../components/Header'
import { ActivityType } from '../../../../model'
import {
  ExtendedActivityFormat,
} from '../../../../services/backend/Activity/types'
import { useFetch } from '../../../../hooks/useFetch'
import { StateDto } from './dto'
import { useRouter } from '../../../../hooks'

type Inputs = {
  activityType: ActivityType
  name: string
  description: string
  place: string
  price: string
  priceType: string
  from: string
  to: string
}

interface Params {
  id: string | undefined
}

const ActivityForm: React.FC = () => {
  const {
    state,
    params: { id },
    navigate,
  } = useRouter<StateDto, Record<string, any>, Params>()
  const { t } = useTranslation('translation', { keyPrefix: 'activity_page' })
  const { t: tInputs } = useTranslation('translation', { keyPrefix: 'activity_page.inputs' })
  const { t: tGlob } = useTranslation('translation')

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()

  // TODO: improve button loading logic
  const [btnLoading, setBtnLoading] = useState<boolean>(false)
  const activityType = watch('activityType')

  const { getApiService, getToastUtils } = useDependencies()
  const apiService = getApiService()
  const { token } = useAuth()
  const activityService = apiService.getActivity(token)
  const toastUtils = getToastUtils()

  const fetchData = async (): Promise<ExtendedActivityFormat | undefined> => {
    if (id) {
      return activityService.get<ExtendedActivityFormat>(id)
    }
    return undefined
  }

  const {
    data: activity,
    loading,
  } = useFetch<ExtendedActivityFormat>({
    fetchData,
    defaultData: undefined,
  }, [id])

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setBtnLoading(true)
      const transformedData = {
        ...data,
        price: parseInt(data.price, 10),
      }

      let activityId: string = ''

      const result = await activityService.putActivity(transformedData, id)
      activityId = result.id.toString()

      toastUtils.Toast.showToast(
        toastUtils.types.SUCCESS,
        id ? t('successfully_edit') : t('successfully_create'),
      )

      setBtnLoading(false)
      navigate(Pages.ACTIVITY_EDIT.getRedirectLink({
        id: activityId,
      }), {
        state,
      })
    } catch (err) {
      setBtnLoading(false)
      toastUtils.Toast.showToast(
        toastUtils.types.ERROR,
        t('error'),
      )
    }
  }

  const acceptActivity = async () => {
    try {
      if (activity) {
        await activityService.acceptActivity(activity.id)
        navigate(Pages.LIST_ACTIVITY.getRedirectLink(), {
          state,
        })
      }
    } catch (err) {
      toastUtils.Toast.showToast(
        toastUtils.types.ERROR,
        t('error'),
      )
    }
  }

  const restoreActivity = async () => {
    try {
      if (activity) {
        await activityService.restoreActivity(activity.id)
        navigate(Pages.LIST_ACTIVITY.getRedirectLink(), {
          state,
        })
      }
    } catch (err) {
      toastUtils.Toast.showToast(
        toastUtils.types.ERROR,
        t('error'),
      )
    }
  }

  if (loading) {
    return (
      <Loading.Component />
    )
  }

  const options: Record<ActivityType, string> = {
    Attraction: tGlob('categories.attraction'),
    Restaurant: tGlob('categories.restaurant'),
    Trip: tGlob('categories.trip'),
    Accommodation: tGlob('categories.accommodation'),
  }

  if (state?.availableTypes) {
    Object.keys(options).forEach((nonTypeKey) => {
      const key = nonTypeKey as ActivityType
      if (!state.availableTypes.includes(key)) {
        delete options[key]
      }
    })
  }

  return (
    <Stack
      gap={2}
    >
      <Header.Component
        title={activity ? t('edit') : t('create')}
        icon={(
          <DownhillSkiing
            fontSize="large"
          />
        )}
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
      >
        <Stack
          gap={2}
        >
          <Select.Component
            variant={Select.Variant.OUTLINED}
            label={t('pick_activity_type')}
            options={options}
            name="activityType"
            register={register}
            default={activity && activity.activityType}
            disabled={Boolean(activity)}
          />

          {(InputsMap(tInputs)[activityType] || []).map((input) => {
            switch (input.type) {
              case 'text':
                // eslint-disable-next-line no-case-declarations
                const validation = ['min:3']
                if (!input.rows) {
                  validation.push('required')
                  validation.push('max:50')
                } else {
                  validation.push('max:1000')
                }
                return (
                  <Input.Component
                    key={input.name}
                    variant={Input.Variant.OUTLINED}
                    type={Input.Type.TEXT}
                    label={input.label}
                    register={register}
                    name={input.name}
                    validation={validation}
                    default={(activity && activity[input.name]) || ''}
                    rows={input.rows}
                    error={errors?.[input.name]?.message || ''}
                  />
                )
              case 'price':
                return (
                  <Input.Component
                    key={input.name}
                    variant={Input.Variant.OUTLINED}
                    type={Input.Type.NUMBER}
                    label={input.label}
                    register={register}
                    name={input.name}
                    default={(activity && activity[input.name]) || ''}
                    validation={['required']}
                    error={errors?.[input.name]?.message || ''}
                  />
                )
              case 'select':
                return (
                  <Select.Component
                    key={input.name}
                    variant={Select.Variant.OUTLINED}
                    label={input.label}
                    options={input.options || {}}
                    name={input.name}
                    register={register}
                    default={(activity && activity[input.name]) || ''}
                  />
                )
              default:
                return <> </>
            }
          })}

          <LoadingButton
            type="submit"
            variant="contained"
            loading={btnLoading}
          >
            { activity ? t('edit') : t('create') }
          </LoadingButton>

        </Stack>
      </form>

      {
        state.travelRecipe && activity && (
          <SaveActivityModal
            activity={activity}
            countDay={state.countDay}
          />
        )
      }

      {
        state.travelInstance && activity && (
          <SaveInstanceActivityModal.Component
            activity={activity}
            date={state.date}
          />
        )
      }

      {
        state.admin && activity && (
          <>
            <Button
              type="button"
              variant="contained"
              color="success"
              onClick={() => acceptActivity()}
            >
              {t('accept')}
            </Button>

            <Button
              type="button"
              variant="contained"
              color="error"
              onClick={() => restoreActivity()}
            >
              {t('delete')}
            </Button>
          </>
        )
      }

      <Button
        type="button"
        variant="outlined"
        onClick={() => navigate(state.previousPage)}
      >
        {t('back')}
      </Button>

    </Stack>
  )
}

export default ActivityForm
