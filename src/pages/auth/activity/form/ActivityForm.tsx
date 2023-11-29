import React from 'react'
import { Button, Stack } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import * as Select from '../../../../components/UI/Select'
import InputsMap from './InputsMap'
import * as Input from '../../../../components/UI/Input'
import { useDependencies } from '../../../../context/dependencies'
import { useAuth } from '../../../../context/auth'

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
  // eslint-disable-next-line no-unused-vars
  const { countDay } = useParams()
  const {
    register, handleSubmit, watch,
  } = useForm<Inputs>()
  const activityType = watch('activityType')

  const { getApiService, getToastUtils } = useDependencies()
  const apiService = getApiService()
  const { token } = useAuth()
  const toastUtils = getToastUtils()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const activityService = apiService.getActivity(token)
      const transformedData = {
        ...data,
        price: parseInt(data.price, 10),
      }
      const activityResult = await activityService.putActivity(transformedData)
      console.log(activityResult)
      toastUtils.Toast.showToast(
        toastUtils.types.SUCCESS,
        'Udało się stworzyć nową aktywność',
      )
    } catch (err) {
      toastUtils.Toast.showToast(
        toastUtils.types.ERROR,
        'Podczas tworzenia aktywności wystąpił błąd',
      )
    }
  }

  return (
    <Stack>
      <h2
        style={{ marginTop: 0 }}
      >
        Dodaj aktywność
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
              Nocleg: 'Nocleg',
              Atrakcja: 'Atrakcja',
            }}
            name="activityType"
            register={register}
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
                  />
                )
              case 'select':
                return (
                  <Select.Component
                    key={input.name}
                    variant={Select.Variant.OUTLINED}
                    label={input.label}
                    options={input.options}
                    name={input.name}
                    register={register}
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
            Dodaj aktywność
          </Button>
        </Stack>
      </form>
    </Stack>
  )
}

export default ActivityForm
