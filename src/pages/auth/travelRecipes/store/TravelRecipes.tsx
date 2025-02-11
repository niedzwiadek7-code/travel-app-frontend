import React from 'react'
import {
  Button,
  Stack,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { ReceiptLong } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import { useDependencies, useAuth } from '../../../../context'
import { TravelRecipe } from '../../../../model'
import * as Loading from '../../../../components/UI/Loading'
import * as Header from '../../../../components/Header'
import * as TravelRecipeCard from './TravelRecipeCard'
import { Pages } from '../../../pages'
import { useFetch } from '../../../../hooks'

const TravelRecipes: React.FC = () => {
  const navigate = useNavigate()
  const { token } = useAuth()
  const { getApiService } = useDependencies()
  const apiService = getApiService()
  const travelService = apiService.getTravel(token)
  const { t } = useTranslation('translation', { keyPrefix: 'travel_recipes_store_page' })

  const fetchData = async () => travelService.getUserTravels()

  const {
    data: travelRecipes,
    loading,
  } = useFetch<TravelRecipe[]>({
    fetchData,
    defaultData: [],
  })

  if (loading) {
    return (
      <Loading.Component />
    )
  }

  return (
    <Stack
      gap={2}
    >
      <Header.Component
        title={t('travel_plans')}
        icon={(
          <ReceiptLong
            fontSize="large"
          />
        )}
      />
      {travelRecipes.map((recipe) => (
        <TravelRecipeCard.Component
          key={recipe.id}
          userTravelRecipe={recipe}
        />
      ))}

      <Button
        type="button"
        variant="outlined"
        onClick={() => navigate(Pages.TRAVEL_RECIPES_STORE.getRedirectLink())}
      >
        {t('back_to_dashboard')}
      </Button>
    </Stack>
  )
}

export default TravelRecipes
