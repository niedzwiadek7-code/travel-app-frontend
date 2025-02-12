import React from 'react'
import {
  Typography,
  Stack,
  Pagination,
  Button,
  useTheme,
  Paper, Box, alpha,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { ArrowBack, ReceiptLong } from '@mui/icons-material'
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
  const {
    state, query, navigate, pathname,
  } = useRouter<StateDto, QueryParams, {}>()
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

  if (loading) {
    return (
      <Loading />
    )
  }

  return (
    <Box
      // spacing={3}
      sx={{
        padding: theme.spacing(3),
        borderRadius: '12px',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[1],
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: theme.shadows[3],
        },
      }}
    >
      {
        state.previousPage && state.previousPage !== pathname && (
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate(state.previousPage)}
          >
            {t('back')}
          </Button>
        )
      }

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

      {
          data.length > 0 ? (
            <Stack>
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

              <Stack direction="row" justifyContent="center" alignItems="center" sx={{ mt: 4 }}>
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
            </Stack>
          ) : (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                padding: theme.spacing(4),
                backgroundColor: alpha(theme.palette.primary.main, 0.05),
                borderRadius: '12px',
              }}
            >
              <ReceiptLong fontSize="large" color="primary" />
              <Typography variant="body1" color="text.secondary" textAlign="center">
                { t('no_activities_found') }
              </Typography>
            </Box>
          )
        }
    </Box>
  )
}

export default ListActivity
