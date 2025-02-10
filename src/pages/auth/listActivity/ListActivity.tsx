// ListActivity.tsx
import React from 'react'
import {
  Typography,
  Stack,
  Pagination,
  Button,
  useTheme,
  Paper, Box,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { ArrowBack } from '@mui/icons-material'
import { useDependencies, useAuth } from '../../../context'
import { ExtendedActivityFormat } from '../../../services/backend/Activity/types'
import { usePagination, useRouter } from '../../../hooks'
import { StateDto } from './dto/state.dto'
import { Pages } from '../../pages'
import ActivityCard from './ActivityCard/ActivityCard'
import Loading from '../../../components/UI/Loading/Loading'

type QueryParams = {
  page?: string
}

const ListActivity: React.FC = () => {
  const theme = useTheme()
  const { state, query, navigate } = useRouter<StateDto, QueryParams, {}>()
  const { t } = useTranslation('translation', { keyPrefix: 'activity_list_page' })

  const { getApiService, getToastUtils } = useDependencies()
  const toastUtils = getToastUtils()
  const { token } = useAuth()
  const apiService = getApiService()
  const [activityService] = React.useState(apiService.getActivity(token))

  const fetchData = async (
    page: number,
    pageSize: number,
  ): Promise<{ data: ExtendedActivityFormat[]; total: number }> => {
    try {
      return await activityService.getAll(
        state.source || 'all',
        page,
        pageSize,
        state.types,
      )
    } catch (err) {
      toastUtils.Toast.showToast(toastUtils.types.ERROR, t('error'))
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

  const handleAccept = async (id: number) => {
    try {
      await activityService.acceptActivity(id)
      setData(data.filter((elem) => elem.id !== id))
    } catch (err) {
      toastUtils.Toast.showToast(toastUtils.types.ERROR, t('error'))
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await activityService.restoreActivity(id)
      setData(data.filter((elem) => elem.id !== id))
    } catch (err) {
      toastUtils.Toast.showToast(toastUtils.types.ERROR, t('error'))
    }
  }

  const handlePageChange = (page: number) => {
    goToPage(page)
    navigate(`${Pages.LIST_ACTIVITY.getRedirectLink()}?page=${page}`, { state })
  }

  return (
    <Box
      // spacing={3}
      sx={{ maxWidth: 1200, margin: '0 auto', p: 3 }}
    >
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate(state.previousPage)}
      >
        {t('back')}
      </Button>

      <Typography
        variant="h4"
        component="h1"
        sx={{
          fontWeight: 700,
          color: theme.palette.text.primary,
          textAlign: 'center',
          mb: 4,
        }}
      >
        {state.admin ? t('activity_manage') : t('activity_list')}
      </Typography>

      {loading ? (
        <Loading />
      ) : (
        <Stack spacing={2}>
          {data.map((activity) => (
            <Paper
              key={activity.id}
              elevation={2}
              // sx={{
              //   transition: 'all 0.2s',
                // '&:hover': {
                  // transform: 'translateX(5px)',
                  // boxShadow: theme.shadows[4],
                  // borderLeft: `4px solid ${theme.palette.primary.main}`,
                // }
              // }}
            >
              <ActivityCard
                activity={activity}
                acceptElement={() => handleAccept(activity.id)}
                deleteElement={() => handleDelete(activity.id)}
              />
            </Paper>
          ))}
        </Stack>
      )}

      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 4 }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(_, page) => handlePageChange(page)}
          shape="rounded"
          color="primary"
          sx={{
            '& .MuiPaginationItem-root': {
              fontWeight: 500,
            },
          }}
        />
      </Stack>
    </Box>
  )
}

export default ListActivity
