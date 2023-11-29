import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Button, Stack,
} from '@mui/material'
import { useDependencies } from '../../../context/dependencies'
import { useAuth } from '../../../context/auth'
import { Activity } from '../../../model'
import { Pages } from '../../../pages/pages'
import * as ActivityCard from './ActivityCard'

const AddActivity: React.FC = () => {
  const { countDay } = useParams()
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
        await activityService.getAll(),
      )
      setLoading(false)
    }
    fetchData()
  }, [activityService])

  if (!countDay) {
    return (
      <div>
        Wystąpił nieoczikwany problem
      </div>
    )
  }

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
        List dostępnych aktywności
      </h2>

      <Stack>
        <Button
          variant="outlined"
          onClick={() => navigate(Pages.ACTIVITY_CREATE.getRedirectLink({
            countDay,
          }))}
        >
          Dodaj nową aktywność
        </Button>
      </Stack>

      <Stack
        gap={2}
      >
        {activities.map((activity) => (
          <ActivityCard.Component
            key={activity.id}
            activity={activity}
            countDay={countDay}
          />
        ))}
      </Stack>

      <Stack
        direction="row"
        justifyContent="flex-end"
      >
        <Button
          variant="outlined"
          onClick={() => navigate(Pages.TRAVEL_DAY.getRedirectLink({
            countDay,
          }))}
        >
          Powrót
        </Button>
      </Stack>

    </Stack>
  )
}

export default AddActivity
