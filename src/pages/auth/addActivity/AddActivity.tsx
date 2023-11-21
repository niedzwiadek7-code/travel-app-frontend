import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Button,
  Stack, useTheme,
} from '@mui/material'
import { useDependencies } from '../../../context/dependencies'
import { useAuth } from '../../../context/auth'
import { Activity } from '../../../model'
import { Pages } from '../../../pages/pages'
import * as SaveActivityModal from './SaveActivityModal'

const AddActivity: React.FC = () => {
  const theme = useTheme()
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
        Dodawanie aktywności (Dzień {countDay}.)
      </h2>

      <Stack
        gap={2}
      >
        {activities.map((activity) => (
          <Stack
            key={activity.id}
            gap={1}
            style={{ padding: '.8em', backgroundColor: theme.palette.grey['200'], borderRadius: '.8em' }}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <div> {activity.name} </div>
              <div>
                {
                  activity.customParameters.place
                    ? activity.customParameters.place
                    : `${activity.customParameters.from} - ${activity.customParameters.to}`
                }
              </div>
              <div>
                Cena w przyszłości
              </div>
            </Stack>
            <hr
              style={{ backgroundColor: theme.palette.grey['900'], height: '1px', width: '100%' }}
            />
            <Stack>
              <Stack
                justifyContent="flex-end"
              >
                <SaveActivityModal.Component
                  activity={activity}
                  countDay={countDay}
                />
              </Stack>
            </Stack>
          </Stack>
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
