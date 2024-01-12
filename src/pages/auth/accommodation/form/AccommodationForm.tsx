import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button, Stack } from '@mui/material'
import { Apartment } from '@mui/icons-material'
import { Accommodation, AccommodationElementInstance, ActivityTypes } from '../../../../model'
import { useDependencies } from '../../../../context/dependencies'
import { useAuth } from '../../../../context/auth'
import { Pages } from '../../../pages'
import * as Loading from '../../../../components/UI/Loading'
import * as Input from '../../../../components/UI/Input'
import * as SaveActivityModal from '../../../../components/SaveActivityModal'
import { putAccommodationInstance } from '../../../../features/travelInstance/travelInstanceSlice'
import { useAppDispatch } from '../../../../app/hooks'
import * as Header from '../../../../components/Header'

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
  const travelService = apiService.getTravel(token)
  const toastUtils = getToastUtils()
  const dispatch = useAppDispatch()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const transformedData = {
        ...data,
        activityType: ActivityTypes.ACCOMMODATION,
        price: parseInt(data.price, 10),
      }

      let accommodationId: string = ''
      if (accommodation) {
        const result = await activityService.putActivity(
          accommodation.id.toString(),
          transformedData,
        )
        accommodationId = result.id.toString()
        toastUtils.Toast.showToast(
          toastUtils.types.INFO,
          'Edycja noclegu przebiegła pomyślnie',
        )
      } else {
        const result = await activityService.createActivity(transformedData)
        accommodationId = result.id.toString()
        toastUtils.Toast.showToast(
          toastUtils.types.SUCCESS,
          'Udało się stworzyć nowy nocleg',
        )
      }

      navigate(Pages.ACCOMMODATION_EDIT.getRedirectLink({
        id: accommodationId,
      }), {
        state,
      })
    } catch (err) {
      toastUtils.Toast.showToast(
        toastUtils.types.ERROR,
        'Wystąpił nieoczekiwany błąd',
      )
    }
  }

  const putAccommodationToTravelInstance = async () => {
    try {
      if (accommodation) {
        const result = await travelService.addAccommodationToTravelInstance(
          state.travelInstance,
          {
            accommodationId: accommodation.id.toString(),
          },
        )
        const travelElement = new AccommodationElementInstance({
          id: result.id,
          passed: false,
          photos: [],
          accommodation,
        })
        dispatch(putAccommodationInstance(travelElement))
        navigate(Pages.TAKING_TRIP.getRedirectLink({
          id: state.travelInstance,
        }))
      }
    } catch (err) {
      toastUtils.Toast.showToast(
        toastUtils.types.ERROR,
        'Wystąpił nieoczekiwany błąd',
      )
    }
  }

  const acceptAccommodation = async () => {
    try {
      if (accommodation) {
        await activityService.acceptAccommodation(accommodation.id.toString())
        navigate(Pages.ADD_ACCOMMODATION.getRedirectLink(), {
          state,
        })
      }
    } catch (err) {
      toastUtils.Toast.showToast(
        toastUtils.types.ERROR,
        'Wystąpił nieoczekiwany błąd',
      )
    }
  }

  const restoreAccommodation = async () => {
    try {
      if (accommodation) {
        await activityService.restoreActivity(accommodation.id.toString())
        navigate(Pages.ADD_ACCOMMODATION.getRedirectLink(), {
          state,
        })
      }
    } catch (err) {
      toastUtils.Toast.showToast(
        toastUtils.types.ERROR,
        'Wystąpił nieoczekiwany błąd',
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
      <Header.Component
        title={accommodation ? 'Edytuj nocleg' : 'Dodaj nocleg'}
        icon={(
          <Apartment
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
          <Input.Component
            variant={Input.Variant.OUTLINED}
            type={Input.Type.TEXT}
            label="Nazwa"
            register={register}
            name="name"
            default={(accommodation && accommodation.name)}
          />

          <Input.Component
            variant={Input.Variant.OUTLINED}
            type={Input.Type.TEXT}
            label="Opis"
            rows={4}
            register={register}
            name="description"
            default={(accommodation && accommodation.description)}
          />

          <Input.Component
            variant={Input.Variant.OUTLINED}
            type={Input.Type.TEXT}
            label="Miejsce"
            register={register}
            name="place"
            default={(accommodation && accommodation.place)}
          />

          <Input.Component
            variant={Input.Variant.OUTLINED}
            type={Input.Type.NUMBER}
            label="Cena (za dzień)"
            register={register}
            name="price"
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
        accommodation && state && state.travelInstance && (
          <Button
            type="button"
            variant="contained"
            onClick={putAccommodationToTravelInstance}
          >
            Skorzystaj z oferty
          </Button>
        )
      }

      {
        state.admin && accommodation && (
          <>
            <Button
              type="button"
              variant="contained"
              color="success"
              onClick={() => acceptAccommodation()}
            >
              Zaakceptuj
            </Button>

            <Button
              type="button"
              variant="contained"
              color="error"
              onClick={() => restoreAccommodation()}
            >
              Usuń
            </Button>
          </>
        )
      }

      {
        state && state.travelRecipe && (
          <Button
            type="button"
            variant="outlined"
            onClick={() => navigate(Pages.CREATE_TRAVEL.getRedirectLink())}
          >
            Powrót
          </Button>
        )
      }

      {
        state && state.travelInstance && (
          <Button
            type="button"
            variant="outlined"
            onClick={() => navigate(Pages.TAKING_TRIP.getRedirectLink({
              id: state.travelInstance,
            }))}
          >
            Powrót
          </Button>
        )
      }

      {
        state?.admin && (
          <Button
            type="button"
            variant="outlined"
            onClick={() => navigate(Pages.ADD_ACCOMMODATION.getRedirectLink(), {
              state,
            })}
          >
            Powrót
          </Button>
        )
      }
    </Stack>
  )
}

export default AccommodationForm
