import React, { useEffect, useState } from 'react'
import {
  Button,
  Stack,
} from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { Create as CreateIcon } from '@mui/icons-material'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import * as Input from '../../../components/UI/Input'
import { setName, setNewTravelRecipe } from '../../../features/travelRecipe/travelRecipeSlice'
import { RootState } from '../../../app/store'
import * as TravelDaysTable from './TravelDaysTable'
import * as TravelSummaryTable from './TravelSummaryTable'
import { useDependencies } from '../../../context/dependencies'
import { useAuth } from '../../../context/auth'
import { Pages } from '../../../pages/pages'
import * as Loading from '../../../components/UI/Loading'
import * as TravelAccommodations from './TravelAccommodations'
import AddAccommodationButton from './AddAccommodationButton'
import * as Header from '../../../components/Header'

const CreateTravel: React.FC = () => {
  const { id } = useParams()
  const [loading, setLoading] = useState<boolean>(false)

  const travelRecipe = useAppSelector((state: RootState) => state.travelRecipe)
  const dispatch = useAppDispatch()
  const { getApiService, getToastUtils } = useDependencies()
  const apiService = getApiService()
  const { token } = useAuth()
  const travelService = apiService.getTravel(token)
  const toastUtils = getToastUtils()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        if (!travelRecipe.id) {
          setLoading(true)
          const travelRecipeTemp = await travelService.get(id)
          dispatch(setNewTravelRecipe(travelRecipeTemp))
          setLoading(false)
        }
      }
    }
    fetchData()
  }, [id])

  const putTravel = async () => {
    try {
      if (travelRecipe.id) {
        await travelService.putTravelRecipe(travelRecipe)
        toastUtils.Toast.showToast(
          toastUtils.types.INFO,
          'Udało ci się poprawić plan wycieczki',
        )
        navigate(Pages.DASHBOARD.getRedirectLink())
      } else {
        await travelService.createTravelRecipe(travelRecipe)
        toastUtils.Toast.showToast(
          toastUtils.types.SUCCESS,
          'Udało ci się poprawnie stworzyć plan wycieczki',
        )
        navigate(Pages.DASHBOARD.getRedirectLink())
      }
    } catch (err) {
      toastUtils.Toast.showToast(
        toastUtils.types.ERROR,
        'Podczas tworzenia wycieczki wystąpił nieoczekiwany błąd',
      )
    }
  }

  if (loading) {
    return (
      <Loading.Component />
    )
  }

  return (
    <Stack
      gap={3}
    >
      <Header.Component
        title="Tworzenie wycieczki"
        icon={(
          <CreateIcon
            fontSize="large"
          />
        )}
      />

      <Stack
        direction="row"
        alignItems="center"
      >
        <Input.Component
          variant={Input.Variant.STANDARD}
          type={Input.Type.TEXT}
          label="Nazwij swoją wycieczkę"
          default={travelRecipe.name}
          onChange={(value: string) => {
            dispatch(setName(value))
          }}
        />
      </Stack>

      <Stack>
        <h2
          style={{ marginTop: 0 }}
        >
          Podsumowanie
        </h2>

        <TravelSummaryTable.Component />
      </Stack>

      <Stack>
        <h2
          style={{ marginTop: 0 }}
        >
          Noclegi
        </h2>

        <TravelAccommodations.Component />

        <AddAccommodationButton />
      </Stack>

      <Stack>
        <h2
          style={{ marginTop: 0 }}
        >
          Przeglądaj poszczególne dni swojej wycieczki
        </h2>

        <TravelDaysTable.Component />
      </Stack>

      <Button
        type="button"
        variant="contained"
        onClick={putTravel}
      >
        {
          travelRecipe.id
            ? 'Edytuj plan wycieczki'
            : 'Zapisz plan wycieczki'
        }
      </Button>

      <Button
        type="button"
        variant="outlined"
        onClick={() => navigate(Pages.DASHBOARD.getRedirectLink())}
      >
        Powrót na stronę główną
      </Button>
    </Stack>
  )
}

export default CreateTravel
