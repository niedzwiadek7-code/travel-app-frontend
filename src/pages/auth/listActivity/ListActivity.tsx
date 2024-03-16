import React, { useState } from 'react'
import {
  Button, Pagination, Stack,
} from '@mui/material'
import { DownhillSkiing } from '@mui/icons-material'
import { useDependencies, useAuth } from '../../../context'
import { Paginate } from '../../../model'
import { ExtendedActivityFormat } from '../../../services/backend/Activity/types'
import { Pages } from '../../pages'
import * as ActivityCard from './ActivityCard'
import * as Header from '../../../components/Header'
import { usePagination, useRouter } from '../../../hooks'
import { StateDto } from './dto/state.dto'

type QueryParams = {
  page?: string,
}

const ListActivity: React.FC = () => {
  const {
    state,
    query,
    navigate,
  } = useRouter<StateDto, QueryParams, Record<string, any>>()

  const { getApiService, getToastUtils } = useDependencies()
  const toastUtils = getToastUtils()
  const { token } = useAuth()
  const apiService = getApiService()
  const [activityService] = useState(apiService.getActivity(token))

  const fetchData = async (
    page: number,
    pageSize: number,
  ): Promise<Paginate<ExtendedActivityFormat>> => {
    try {
      return activityService.getAll(state.source || 'all', page, pageSize)
    } catch (err) {
      toastUtils.Toast.showToast(
        toastUtils.types.ERROR,
        'Wystąpił nieoczekiwany błąd',
      )
      return {
        data: [],
        total: 0,
      }
    }
  }

  const {
    data,
    setData,
    currentPage,
    totalPages,
    loading,
    goToPage,
  } = usePagination<ExtendedActivityFormat>({
    fetchData,
    initialPage: query.page ? parseInt(query.page, 10) : 1,
    initialPageSize: 10,
  })

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

  const goToPageLocally = (page: number) => {
    goToPage(page)
    navigate(
      `${Pages.LIST_ACTIVITY.getRedirectLink()}?page=${page}`,
      {
        state: {
          source: state.source,
          types: ['Attraction', 'Restaurant', 'Trip'],
        },
      },
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

      <Stack
        direction="row"
        justifyContent="center"
        sx={{
          marginTop: 1,
          marginBottom: 1,
        }}
      >
        <Pagination
          count={totalPages}
          color="primary"
          onChange={(event, page) => goToPageLocally(page)}
          page={currentPage}
        />
      </Stack>
    </Stack>
  )
}

export default ListActivity
