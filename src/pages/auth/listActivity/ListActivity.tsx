import React, { useState } from 'react'
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  Divider,
  Paper,
  Stack,
  CircularProgress,
  Pagination,
  Button,
  Box, ListItemIcon,
} from '@mui/material'
import { AddCircleOutline, Info } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import DoneIcon from '@mui/icons-material/Done'
import DeleteIcon from '@mui/icons-material/Delete'
import { useDependencies, useAuth } from '../../../context'
import { Paginate } from '../../../model'
import { ExtendedActivityFormat } from '../../../services/backend/Activity/types'
import { usePagination, useRouter } from '../../../hooks'
import { StateDto } from './dto/state.dto'
import { Pages } from '../../pages'
import * as SaveActivityModal from '../../../components/SaveActivityModal'
import * as SaveInstanceActivityModal from '../../../components/SaveInstanceActivityModal'
import ActivityCard from './ActivityCard/ActivityCard'

type QueryParams = {
  page?: string,
}

const ListActivity: React.FC = () => {
  const { state, query, navigate } = useRouter<StateDto, QueryParams, Record<string, any>>()
  const { t } = useTranslation('translation', { keyPrefix: 'activity_list_page' })

  const { getApiService, getToastUtils } = useDependencies()
  const toastUtils = getToastUtils()
  const { token } = useAuth()
  const apiService = getApiService()
  const [activityService] = useState(apiService.getActivity(token))

  // Funkcja pobierająca dane aktywności z backendu
  const fetchData = async (
    page: number,
    pageSize: number,
  ): Promise<Paginate<ExtendedActivityFormat>> => {
    try {
      return await activityService.getAll(
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
      return { data: [], total: 0 }
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

  const handleViewDetails = (activity: ExtendedActivityFormat) => {
    navigate(`${Pages.ACTIVITY_DETAILS.getRedirectLink()}/${activity.id}`, { state: { activity } })
  }

  const goToPageLocally = (page: number) => {
    goToPage(page)
    navigate(`${Pages.LIST_ACTIVITY.getRedirectLink()}?page=${page}`, { state })
  }

  if (loading) {
    return (
      <Stack sx={{
        display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 4,
      }}
      >
        <CircularProgress />
      </Stack>
    )
  }

  // const getAllImages: (activity: ExtendedActivityFormat) => Array<string> = (
  //   activity: ExtendedActivityFormat,
  // ) => {
  //   const allImages: string[] = []
  //   activity.ratings.forEach((rating) => {
  //     rating.photos.forEach((photo) => {
  //       allImages.push(photo)
  //     })
  //   })
  //   return allImages
  // }

  // eslint-disable-next-line no-unused-vars
  const getPrimaryImage: (activity: ExtendedActivityFormat) => string | null = (
    activity: ExtendedActivityFormat,
  ) => {
    if (activity?.ratings[0]?.photos[0]) {
      return activity.ratings[0].photos[0]
    }
    return null
  }

  return (
    <Stack spacing={2} sx={{ p: 2 }}>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        {state.admin ? t('activity_manage') : t('activity_list')}
      </Typography>
      <Paper elevation={3}>
        <List>
          {data.map((activity, index) => (
            <React.Fragment key={activity.id}>
              <ActivityCard
                activity={activity}
                state={state}
                acceptElement={() => acceptElement(activity.id)}
                deleteElement={() => deleteElement(activity.id)}
              />
              {index < data.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Paper>

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

      <Stack direction="row" justifyContent="center" sx={{ mt: 2 }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          color="primary"
          onChange={(event, page) => goToPageLocally(page)}
        />
      </Stack>
    </Stack>
  )
}

export default ListActivity
