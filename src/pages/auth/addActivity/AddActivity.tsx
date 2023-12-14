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
  const { getApiService, getToastUtils } = useDependencies()
  const toastUtils = getToastUtils()
  const { token } = useAuth()
  const apiService = getApiService()
  const [loading, setLoading] = useState<boolean>(true)
  const [activityService] = useState(apiService.getActivity(token))
  const [activities, setActivities] = useState<Activity[]>([])
  const navigate = useNavigate()

  const acceptElement = async (id: string) => {
    try {
      await activityService.acceptActivity(id)
      const activitiesTemp = activities.filter((elem) => elem.id.toString() !== id)
      setActivities(activitiesTemp)
    } catch (err) {
      toastUtils.Toast.showToast(
        toastUtils.types.ERROR,
        'Wystąpił nieoczekiwany błąd',
      )
    }
  }

  const deleteElement = async (id: string) => {
    try {
      await activityService.restoreActivity(id)
      const activitiesTemp = activities.filter((elem) => elem.id.toString() !== id)
      setActivities(activitiesTemp)
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
        title={state.admin ? 'Zarządzaj aktywnościami' : 'Lista dostępnych aktywności'}
        icon={(
          <DownhillSkiing
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
              onClick={() => navigate(Pages.TRAVEL_DAY.getRedirectLink({
                countDay: state.countDay,
              }))}
            >
              Powrót
            </Button>
          )
        }
        {
          state?.travelInstance && (
            <Button
              variant="outlined"
              onClick={() => navigate(Pages.TAKING_TRIP_DAY.getRedirectLink({
                date: state.date,
              }))}
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
        {activities.map((activity) => (
          <ActivityCard.Component
            key={activity.id}
            activity={activity}
            state={state}
            acceptElement={() => acceptElement(activity.id.toString())}
            deleteElement={() => deleteElement(activity.id.toString())}
          />
        ))}
      </Stack>
    </Stack>
  )
}

export default AddActivity
