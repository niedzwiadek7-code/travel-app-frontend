import React, { useEffect, useState } from 'react'
import { Button, Stack } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import * as Select from '../../../../components/UI/Select'
import InputsMap from './InputsMap'
import * as Input from '../../../../components/UI/Input'
import { useDependencies } from '../../../../context/dependencies'
import { useAuth } from '../../../../context/auth'
import { Activity } from '../../../../model'
import { Pages } from '../../../../pages/pages'
import * as Loading from '../../../../components/UI/Loading'
import SaveActivityModal from './SaveActivityModal'

type Inputs = {
  activityType: string
  name: string
  description: string
  place: string
  price: string
  priceType: string
  from: string
  to: string
}

const ActivityForm: React.FC = () => {
  const { countDay, id } = useParams()
  const {
    register,
    handleSubmit,
    watch,
    setValue,
  } = useForm<Inputs>()
  const [activity, setActivity] = useState<undefined | Activity>(undefined)
  const [loading, setLoading] = useState<boolean>(true)
  const activityType = watch('activityType')
  const navigate = useNavigate()

  const { getApiService, getToastUtils } = useDependencies()
  const apiService = getApiService()
  const { token } = useAuth()
  const activityService = apiService.getActivity(token)
  const toastUtils = getToastUtils()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const transformedData = {
        ...data,
        price: parseInt(data.price, 10),
      }
      const result = await activityService.putActivity(transformedData)
      toastUtils.Toast.showToast(
        toastUtils.types.SUCCESS,
        'Udało się stworzyć nową aktywność',
      )
      navigate(Pages.ACTIVITY_EDIT.getRedirectLink({
        countDay: countDay || '',
        id: result.id.toString(),
      }))
    } catch (err) {
      toastUtils.Toast.showToast(
        toastUtils.types.ERROR,
        'Podczas tworzenia aktywności wystąpił błąd',
      )
    }
  }

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        setLoading(true)
        const activityTemp = await activityService.get(id)
        setActivity(activityTemp)
        setValue('activityType', activityTemp.activityType)
        setLoading(false)
      }
      fetchData()
    } else {
      setActivity(undefined)
      setLoading(false)
    }
  }, [id])

  if (loading) {
    return (
      <Loading.Component />
    )
  }

  return (
    <Stack
      gap={2}
    >
      <h2
        style={{ marginTop: 0 }}
      >
        { activity ? 'Edytuj aktywność' : 'Dodaj aktywność' }
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
      >
        <Stack
          gap={2}
        >
          <Select.Component
            variant={Select.Variant.OUTLINED}
            label="Wybierz typ aktywności"
            options={{
              Restauracja: 'Restauracja',
              Podróż: 'Podróż',
              Atrakcja: 'Atrakcja',
            }}
            name="activityType"
            register={register}
            default={activity && activity.activityType}
            disabled={Boolean(activity)}
          />

          {(InputsMap[activityType] || []).map((input) => {
            switch (input.type) {
              case 'text':
                return (
                  <Input.Component
                    key={input.name}
                    variant={Input.Variant.OUTLINED}
                    type={Input.Type.TEXT}
                    label={input.label}
                    data={register(input.name)}
                    default={(activity && activity[input.name]) || ''}
                  />
                )
              case 'price':
                return (
                  <Input.Component
                    key={input.name}
                    variant={Input.Variant.OUTLINED}
                    type={Input.Type.NUMBER}
                    label={input.label}
                    data={register(input.name)}
                    default={(activity && activity[input.name]) || ''}
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

          <Button
            type="submit"
            variant="contained"
          >
            { activity ? 'Edytuj aktywność' : 'Dodaj aktywność' }
          </Button>
        </Stack>
      </form>

      {
        countDay && activity && (
          <SaveActivityModal
            activity={activity}
            countDay={countDay}
          />
        )
      }

      {
        countDay && (
          <Button
            type="button"
            variant="contained"
            onClick={() => navigate(Pages.ADD_ACTIVITY.getRedirectLink({
              countDay,
            }))}
          >
            Powrót
          </Button>
        )
      }
    </Stack>
  )
}

export default ActivityForm
