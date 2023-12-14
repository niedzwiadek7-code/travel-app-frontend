import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  Button, Stack,
} from '@mui/material'
import { Apartment } from '@mui/icons-material'
import { useDependencies } from '../../../context/dependencies'
import { useAuth } from '../../../context/auth'
import { Accommodation } from '../../../model'
import { Pages } from '../../../pages/pages'
import * as AccommodationCard from './AccommodationCard'
import { useAppSelector } from '../../../app/hooks'
import { RootState } from '../../../app/store'
import * as Header from '../../../components/Header'

const AddAccommodation: React.FC = () => {
  const { state } = useLocation()
  const travelRecipe = useAppSelector((e: RootState) => e.travelRecipe)
  const { getApiService, getToastUtils } = useDependencies()
  const toastUtils = getToastUtils()
  const { token } = useAuth()
  const apiService = getApiService()
  const [loading, setLoading] = useState<boolean>(true)
  const [activityService] = useState(apiService.getActivity(token))
  const [accommodations, setAccommodations] = useState<Accommodation[]>([])
  const navigate = useNavigate()

  const acceptElement = async (id: string) => {
    try {
      await activityService.acceptAccommodation(id)
      const accommodationsTemp = accommodations.filter((elem) => elem.id.toString() !== id)
      setAccommodations(accommodationsTemp)
    } catch (err) {
      toastUtils.Toast.showToast(
        toastUtils.types.ERROR,
        'Wystąpił nieoczekiwany błąd',
      )
    }
  }

  const deleteElement = async (id: string) => {
    try {
      await activityService.restoreAccommodation(id)
      const accommodationsTemp = accommodations.filter((elem) => elem.id.toString() !== id)
      setAccommodations(accommodationsTemp)
    } catch (err) {
      toastUtils.Toast.showToast(
        toastUtils.types.ERROR,
        'Wystąpił nieoczekiwany błąd',
      )
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setAccommodations(
        await activityService.getAllAccommodations(state.source),
      )
      setLoading(false)
    }
    fetchData()
  }, [activityService])

  if (loading) {
    return (
      <div> Loading... </div>
    )
  }

  return (
    <Stack
      gap={2}
    >
      <Header.Component
        title={state?.admin ? 'Zarządzanie noclegami' : 'Lista dostępnych noclegów'}
        icon={(
          <Apartment
            fontSize="large"
          />
        )}
      />

      <Stack
        direction="row"
        justifyContent="flex-end"
      >
        {
          state?.travelRecipe && (
            <Button
              variant="outlined"
              onClick={() => {
                if (travelRecipe.id) {
                  navigate(Pages.EDIT_TRAVEL.getRedirectLink({
                    id: travelRecipe.id.toString(),
                  }))
                } else {
                  navigate(Pages.CREATE_TRAVEL.getRedirectLink())
                }
              }}
            >
              Powrót
            </Button>
          )
        }
        {
          state?.travelInstance && (
            <Button
              variant="outlined"
              onClick={() => navigate(Pages.TAKING_TRIP.getRedirectLink())}
            >
              Powrót
            </Button>
          )
        }
        {
          state?.admin && (
            <Button
              variant="outlined"
              onClick={() => navigate(Pages.DASHBOARD.getRedirectLink())}
            >
              Powrót
            </Button>
          )
        }
      </Stack>

      <Stack
        gap={2}
      >
        {accommodations.map((accommodation) => (
          <AccommodationCard.Component
            key={accommodation.id}
            accommodation={accommodation}
            state={state}
            acceptElement={() => acceptElement(accommodation.id.toString())}
            deleteElement={() => deleteElement(accommodation.id.toString())}
          />
        ))}
      </Stack>
    </Stack>
  )
}

export default AddAccommodation
