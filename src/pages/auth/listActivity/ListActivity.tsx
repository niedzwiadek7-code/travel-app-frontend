import React, { useState } from 'react'
import {
  Button, Pagination, Stack,
} from '@mui/material'
import { DownhillSkiing } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation('translation', { keyPrefix: 'activity_list_page' })

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
      return activityService.getAll(
        state.source || 'all',
        page,
        pageSize,
        state.types,
      )
    } catch (err) {
      toastUtils.Toast.showToast(
        toastUtils.types.ERROR,
        t('error'),
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
        t('error'),
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
        t('error'),
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
        state,
      },
    )
  }

  return (
    <Stack
      gap={2}
    >
      <Header.Component
        title={state.admin ? t('activity_manage') : t('activity_list')}
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
        <Button
          variant="outlined"
          onClick={() => navigate(state.previousPage)}
        >
          {t('back')}
        </Button>
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
