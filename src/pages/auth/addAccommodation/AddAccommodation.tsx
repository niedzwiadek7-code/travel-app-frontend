import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Button, Stack,
} from '@mui/material'
import { useDependencies } from '../../../context/dependencies'
import { useAuth } from '../../../context/auth'
import { Accommodation } from '../../../model'
import { Pages } from '../../../pages/pages'
import * as AccommodationCard from './AccommodationCard'
import { useAppSelector } from '../../../app/hooks'
import { RootState } from '../../../app/store'

const AddAccommodation: React.FC = () => {
  const travelRecipe = useAppSelector((state: RootState) => state.travelRecipe)
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
        await activityService.getAllAccommodations(),
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
      <h2
        style={{ marginTop: 0 }}
      >
        List dostępnych noclegów
      </h2>

      <Stack>
        <Button
          variant="outlined"
          onClick={() => navigate(Pages.ACCOMMODATION_CREATE.getRedirectLink(), {
            state: {
              travelRecipe: true,
            },
          })}
        >
          Dodaj nowy nocleg
        </Button>
      </Stack>

      <Stack
        gap={2}
      >
        {accommodations.map((accommodation) => (
          <AccommodationCard.Component
            key={accommodation.id}
            accommodation={accommodation}
            countDay=""
          />
        ))}
      </Stack>

      <Stack
        direction="row"
        justifyContent="flex-end"
      >
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
      </Stack>

    </Stack>
  )
}

export default AddAccommodation
