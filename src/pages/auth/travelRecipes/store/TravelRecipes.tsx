import React from 'react'
import {
  Stack,
  Typography,
  useTheme,
  styled,
  Box,
  alpha,
} from '@mui/material'
import { ReceiptLong } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import { useDependencies, useAuth } from '../../../../context'
import { TravelRecipe } from '../../../../model'
import * as TravelRecipeCard from './TravelRecipeCard'
import { useFetch } from '../../../../hooks'
import Loading from '../../../../components/UI/Loading/Loading'

const StyledStack = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '12px',
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[1],
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: theme.shadows[3],
  },
}))

const TravelRecipes: React.FC = () => {
  const { token } = useAuth()
  const { getApiService, getToastUtils } = useDependencies()
  const toastUtils = getToastUtils()
  const apiService = getApiService()
  const travelService = apiService.getTravel(token)
  const { t } = useTranslation('translation', { keyPrefix: 'travel_recipes_store_page' })
  const theme = useTheme()

  const fetchData = async () => travelService.getUserTravels()

  const {
    data: travelRecipes,
    loading,
    setData,
  } = useFetch<TravelRecipe[]>({
    fetchData,
    defaultData: [],
  })

  const deleteTravelRecipe = async (id: number) => {
    try {
      await travelService.restoreTravelRecipe(id)
      const temp = travelRecipes.filter((recipe) => recipe.id !== id)
      setData(temp)
      toastUtils.Toast.showToast(
        toastUtils.types.SUCCESS,
        t('delete_success'),
      )
    } catch (err) {
      toastUtils.Toast.showToast(
        toastUtils.types.ERROR,
        t('delete_error'),
      )
    }
  }

  if (loading) {
    return (
      <Loading />
    )
  }

  return (
    <StyledStack gap={3}>
      <Typography variant="h4" fontWeight={700} color="text.primary">
        {t('your_travel_recipes')}
      </Typography>

      {travelRecipes.length > 0 ? (
        <Stack gap={2}>
          {travelRecipes.map((recipe) => (
            <TravelRecipeCard.Component
              key={recipe.id}
              userTravelRecipe={recipe}
              deleteTravelRecipe={() => deleteTravelRecipe(recipe.id)}
            />
          ))}
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
            {t('no_recipes_found')}
          </Typography>
        </Box>
      )}
    </StyledStack>
  )
}

export default TravelRecipes
