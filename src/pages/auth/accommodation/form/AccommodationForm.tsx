import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button, Stack } from '@mui/material'
import { Accommodation, ActivityTypes } from '../../../../model'
import { useDependencies } from '../../../../context/dependencies'
import { useAuth } from '../../../../context/auth'
import { Pages } from '../../../pages'
import * as Loading from '../../../../components/UI/Loading'
import * as Input from '../../../../components/UI/Input'
import * as SaveActivityModal from '../../../../components/SaveActivityModal'

type Inputs = {
  name: string
  description: string
  place: string
  price: string
}

const AccommodationForm: React.FC = () => {
  const { id } = useParams()
  const { state } = useLocation()
  const {
    register,
    handleSubmit,
  } = useForm<Inputs>()
  const [accommodation, setAccommodation] = useState<undefined | Accommodation>(undefined)
  const [loading, setLoading] = useState<boolean>(true)
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
        activityType: ActivityTypes.ACCOMMODATION,
        price: parseInt(data.price, 10),
      }
      const result = await activityService.putActivity(transformedData)
      toastUtils.Toast.showToast(
        toastUtils.types.SUCCESS,
        'Udało się stworzyć nowy nocleg',
      )
      navigate(Pages.ACCOMMODATION_EDIT.getRedirectLink({
        id: result.id.toString(),
      }), {
        state: {
          travelRecipe: state && state.travelRecipe,
        },
      })
    } catch (err) {
      toastUtils.Toast.showToast(
        toastUtils.types.ERROR,
        'Podczas tworzenia noclegu wystąpił błąd',
      )
    }
  }

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        setLoading(true)
        const activityTemp = await activityService.getAccommodation(id)
        activityTemp.activityType = ActivityTypes.ACCOMMODATION
        setAccommodation(activityTemp)
        setLoading(false)
      }
      fetchData()
    } else {
      setAccommodation(undefined)
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
        { accommodation ? 'Edytuj nocleg' : 'Dodaj nocleg' }
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
      >
        <Stack
          gap={2}
        >
          <Input.Component
            variant={Input.Variant.OUTLINED}
            type={Input.Type.TEXT}
            label="Nazwa"
            data={register('name')}
            default={(accommodation && accommodation.name)}
          />

          <Input.Component
            variant={Input.Variant.OUTLINED}
            type={Input.Type.TEXT}
            label="Opis"
            data={register('description')}
            default={(accommodation && accommodation.description)}
          />

          <Input.Component
            variant={Input.Variant.OUTLINED}
            type={Input.Type.TEXT}
            label="Miejsce"
            data={register('place')}
            default={(accommodation && accommodation.place)}
          />

          <Input.Component
            variant={Input.Variant.OUTLINED}
            type={Input.Type.NUMBER}
            label="Cena (za dzień)"
            data={register('price')}
            default={(accommodation && accommodation.price)}
          />

          <Button
            type="submit"
            variant="contained"
          >
            { accommodation ? 'Edytuj nocleg' : 'Dodaj nocleg' }
          </Button>
        </Stack>
      </form>

      {
        accommodation && state && state.travelRecipe && (
          <SaveActivityModal.Component
            activity={accommodation}
            countDay=""
          />
        )
      }

      {
        state && state.travelRecipe && (
          <Button
            type="button"
            variant="contained"
            onClick={() => navigate(Pages.ADD_ACCOMMODATION.getRedirectLink())}
          >
            Powrót
          </Button>
        )
      }
    </Stack>
  )
}

export default AccommodationForm
