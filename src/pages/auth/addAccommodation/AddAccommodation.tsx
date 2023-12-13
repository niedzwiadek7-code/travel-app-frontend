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
  const { getApiService } = useDependencies()
  const { token } = useAuth()
  const apiService = getApiService()
  const [loading, setLoading] = useState<boolean>(true)
  const [activityService] = useState(apiService.getActivity(token))
  const [accommodations, setAccommodations] = useState<Accommodation[]>([])
  const navigate = useNavigate()

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
        title="Lista dostępnych noclegów"
        icon={(
          <Apartment
            fontSize="large"
          />
        )}
      />

      <Stack
        gap={2}
      >
        {accommodations.map((accommodation) => (
          <AccommodationCard.Component
            key={accommodation.id}
            accommodation={accommodation}
            state={state}
          />
        ))}
      </Stack>

      <Stack
        direction="row"
        justifyContent="flex-end"
      >
        {
          state?.travelRecipe ? (
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
          ) : (
            <Button
              type="button"
              variant="contained"
              onClick={() => navigate(Pages.TAKING_TRIP.getRedirectLink({
                id: state.travelInstance,
              }))}
            >
              Powrót
            </Button>
          )
        }
      </Stack>

    </Stack>
  )
}

export default AddAccommodation
