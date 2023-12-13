import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  Button, Stack,
} from '@mui/material'
import { DownhillSkiing } from '@mui/icons-material'
import { useDependencies } from '../../../context/dependencies'
import { useAuth } from '../../../context/auth'
import { Activity } from '../../../model'
import { Pages } from '../../../pages/pages'
import * as ActivityCard from './ActivityCard'
import * as Header from '../../../components/Header'

const AddActivity: React.FC = () => {
  const { state } = useLocation()
  const { getApiService } = useDependencies()
  const { token } = useAuth()
  const apiService = getApiService()
  const [loading, setLoading] = useState<boolean>(true)
  const [activityService] = useState(apiService.getActivity(token))
  const [activities, setActivities] = useState<Activity[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setActivities(
        await activityService.getAll(state.source || 'all'),
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
        title="Lista dostępnych aktywności"
        icon={(
          <DownhillSkiing
            fontSize="large"
          />
        )}
      />

      <Stack
        gap={2}
      >
        {activities.map((activity) => (
          <ActivityCard.Component
            key={activity.id}
            activity={activity}
            state={state}
          />
        ))}
      </Stack>

      <Stack
        direction="row"
        justifyContent="flex-end"
      >
        <Button
          variant="outlined"
          onClick={() => (state?.travelRecipe ? (
            navigate(Pages.TRAVEL_DAY.getRedirectLink({
              countDay: state.countDay,
            }))
          ) : (
            navigate(Pages.TAKING_TRIP_DAY.getRedirectLink({
              date: state.date,
            }))
          ))}
        >
          Powrót
        </Button>
      </Stack>

    </Stack>
  )
}

export default AddActivity
