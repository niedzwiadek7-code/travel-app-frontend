import React, { useState } from 'react'
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
import usePagination from '../../../hooks/usePagination/usePagination'

const AddActivity: React.FC = () => {
  const { state } = useLocation()
  const { getApiService, getToastUtils } = useDependencies()
  const toastUtils = getToastUtils()
  const { token } = useAuth()
  const apiService = getApiService()
  const [activityService] = useState(apiService.getActivity(token))
  const navigate = useNavigate()

  const fetchData = async (page: number, pageSize: number): Promise<Activity[]> => {
    try {
      const result = await activityService.getAll(state.source || 'all', page, pageSize)
      return result.data
    } catch (err) {
      toastUtils.Toast.showToast(
        toastUtils.types.ERROR,
        'Wystąpił nieoczekiwany błąd',
      )
      return []
    }
  }

  const {
    data,
    setData,
    // currentPage,
    // totalPages,
    // pageSize,
    loading,
    // goToPage,
    // setPageSize,
  } = usePagination<Activity>({ fetchData, initialPage: 1, initialPageSize: 10 })

  const acceptElement = async (id: number) => {
    try {
      await activityService.acceptActivity(id)
      const activitiesTemp = data.filter((elem) => elem.id !== id)
      setData(activitiesTemp)
    } catch (err) {
      toastUtils.Toast.showToast(
        toastUtils.types.ERROR,
        'Wystąpił nieoczekiwany błąd',
      )
    }
  }

  const deleteElement = async (id: number) => {
    try {
      await activityService.restoreActivity(id)
      const activitiesTemp = data.filter((elem) => elem.id !== id)
      setData(activitiesTemp)
    } catch (err) {
      toastUtils.Toast.showToast(
        toastUtils.types.ERROR,
        'Wystąpił nieoczekiwany błąd',
      )
    }
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
        {data.map((activity) => (
          <ActivityCard.Component
            key={activity.id}
            activity={activity}
            state={state}
            acceptElement={() => acceptElement(activity.id)}
            deleteElement={() => deleteElement(activity.id)}
          />
        ))}
      </Stack>
    </Stack>
  )
}

export default AddActivity
