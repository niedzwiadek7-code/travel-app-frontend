import React, { useEffect, useState } from 'react'
import {
  Button,
  Stack,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { ReceiptLong } from '@mui/icons-material'
import { useDependencies } from '../../../context/dependencies'
import { UserTravelRecipeDto } from '../../../services/backend/Travel/dto'
import { useAuth } from '../../../context/auth'
import * as Loading from '../../../components/UI/Loading'
import * as Header from '../../../components/Header'
import * as TravelRecipeCard from './TravelRecipeCard'
import { Pages } from '../../pages'

const TravelRecipes: React.FC = () => {
  const navigate = useNavigate()
  const { token } = useAuth()
  const { getApiService } = useDependencies()
  const apiService = getApiService()
  const travelService = apiService.getTravel(token)
  const [loading, setLoading] = useState<boolean>(true)
  const [travelRecipes, setTravelRecipes] = useState<UserTravelRecipeDto[]>([])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setTravelRecipes(
        await travelService.getUserTravels(),
      )
      setLoading(false)
    }
    fetchData()
  }, [])

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
        title="Plany wycieczek"
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
        onClick={() => navigate(Pages.DASHBOARD.getRedirectLink())}
      >
        Powrót do strony głównej
      </Button>
    </Stack>
  )
}

export default TravelRecipes
