import React, { useEffect, useState } from 'react'
import {
  Button,
  Stack,
  useTheme, Typography, Tooltip, IconButton,
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
import {
  AddCircleOutline, ArrowBack, Clear, Done,
} from '@mui/icons-material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import * as Select from '../../../../components/UI/Select'
import InputsMap from './InputsMap'
import * as Input from '../../../../components/UI/Input'
import { useDependencies, useAuth } from '../../../../context'
import { Pages } from '../../../pages'
import * as Loading from '../../../../components/UI/Loading'
import { Activity, ActivityType } from '../../../../model'
import { ExtendedActivityFormat } from '../../../../services/backend/Activity/types'
import { useFetch } from '../../../../hooks/useFetch'
import { StateDto } from './dto'
import { useRouter } from '../../../../hooks'
import StateButtons from '../../../../components/StateButtons/StateButtons'

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

  const theme = useTheme()

  const [btnLoading, setBtnLoading] = useState<boolean>(false)

  const { getApiService, getToastUtils } = useDependencies()
  const apiService = getApiService()
  const { token } = useAuth()
  const activityService = apiService.getActivity(token)
  const toastUtils = getToastUtils()

  const fetchData = async (): Promise<Activity | undefined> => {
    if (id) {
      return activityService.get(id)
    }
    return undefined
  }

  const {
    data: activity,
    loading,
  } = useFetch<ExtendedActivityFormat>(
    { fetchData, defaultData: undefined },
    [id],
  )

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Inputs>()

  useEffect(() => {
    if (activity) {
      setValue('activityType', activity.activityType)
    }
  }, [activity])

  const activityType = watch('activityType')

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
      if (!activity) {
        navigate(
          Pages.ACTIVITY_GET.getRedirectLink({
            id: activityId,
          }),
          { state },
        )
        return
      }

      navigate(Pages.ACTIVITY_EDIT.getRedirectLink({
        id: activityId,
      }), {
        state,
        replace: true,
      })
    } catch (err) {
      setBtnLoading(false)
      toastUtils.Toast.showToast(
        toastUtils.types.ERROR,
        t('error'),
      )
    }
  }

  if (loading) {
    return <Loading.Component />
  }

  const options: Record<ActivityType, string> = {
    Attraction: tGlob('categories.Attraction'),
    Restaurant: tGlob('categories.Restaurant'),
    Trip: tGlob('categories.Trip'),
    Accommodation: tGlob('categories.Accommodation'),
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
      sx={{
        padding: theme.spacing(3),
        borderRadius: '12px',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[1],
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: theme.shadows[3],
        },
      }}
      gap={3}
    >
      <Stack
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
        flexDirection="row"
        sx={{ width: '100%' }}
      >
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate(state.previousPage, { state })}
        >
          {t('back')}
        </Button>
      </Stack>

      <Stack
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography variant="h4" fontWeight={700} color="text.primary">
          {activity ? t('edit') : t('create')}
        </Typography>

        {
          state?.admin && activity && (
            <Stack
              display="flex"
              flexDirection="row"
              gap={1}
            >
              <StateButtons
                acceptButton={(
                  <Tooltip title={t('accept')}>
                    <IconButton
                      color="success"
                      sx={{ bgcolor: `${theme.palette.success.light}20` }}
                    >
                      <Done fontSize="small" />
                    </IconButton>
                  </Tooltip>
              )}
                deleteButton={(
                  <Tooltip title={t('reject')}>
                    <IconButton
                      color="error"
                      sx={{ bgcolor: `${theme.palette.error.light}20` }}
                    >
                      <Clear fontSize="small" />
                    </IconButton>
                  </Tooltip>
              )}
                addButton={(
                  <Tooltip title={t('add_to_travel')}>
                    <IconButton
                      color="primary"
                      sx={{ bgcolor: `${theme.palette.primary.light}20` }}
                    >
                      <AddCircleOutline fontSize="small" />
                    </IconButton>
                  </Tooltip>
              )}
                activity={Activity.fromActivityFormat(activity)}
              />
            </Stack>
          )
        }
      </Stack>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={3}>
          <Select.Component
            variant={Select.Variant.OUTLINED}
            label={t('pick_activity_type')}
            options={options}
            name="activityType"
            register={register}
            default={activity && activity.activityType}
            disabled={Boolean(activity)}
          />

          {
            activityType && (
              <Typography variant="body1" fontWeight={700} color="text.primary">
                {t('fill_details')}
              </Typography>
            )
          }

          {(InputsMap(tInputs)[activityType] || []).map((input) => {
            switch (input.type) {
              case 'text': {
                const validation = ['min:3']
                if (!input.rows) {
                  validation.push('required', 'max:50')
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
              }
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
                return null
            }
          })}

          {
            activityType && (
              <LoadingButton type="submit" variant="contained" loading={btnLoading}>
                {activity ? t('edit') : t('create')}
              </LoadingButton>
            )
          }
        </Stack>
      </form>
    </Stack>
  )
}

export default ActivityForm
