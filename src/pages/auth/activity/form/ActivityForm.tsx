import React, { useEffect, useState } from 'react'
import { Button, Stack } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { DownhillSkiing } from '@mui/icons-material'
import * as Select from '../../../../components/UI/Select'
import InputsMap from './InputsMap'
import * as Input from '../../../../components/UI/Input'
import { useDependencies } from '../../../../context/dependencies'
import { useAuth } from '../../../../context/auth'
import { Activity } from '../../../../model'
import { Pages } from '../../../../pages/pages'
import * as Loading from '../../../../components/UI/Loading'
import SaveActivityModal from './SaveActivityModal'
import * as SaveInstanceActivityModal from '../../../../components/SaveInstanceActivityModal'
import * as Header from '../../../../components/Header'

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
  const { id } = useParams()
  const { state } = useLocation()
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
        id: result.id.toString(),
      }), {
        state,
      })
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
      <Header.Component
        title={activity ? 'Edytuj aktywność' : 'Dodaj aktywność'}
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
        state.countDay && (
          <Button
            type="button"
            variant="contained"
            onClick={() => navigate(Pages.TRAVEL_DAY.getRedirectLink({
              countDay: state.countDay,
            }))}
          >
            Powrót
          </Button>
        )
      }

      {
        state.travelInstance && (
          <Button
            type="button"
            variant="contained"
            onClick={() => navigate(Pages.TAKING_TRIP_DAY.getRedirectLink({
              date: state.date,
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
