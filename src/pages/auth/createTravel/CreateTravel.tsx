import React from 'react'
import {
  Button,
  Stack,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import * as Input from '../../../components/UI/Input'
import { setName } from '../../../features/travelRecipe/travelRecipeSlice'
import { RootState } from '../../../app/store'
import * as TravelDaysTable from './TravelDaysTable'
import * as TravelSummaryTable from './TravelSummaryTable'
import { useDependencies } from '../../../context/dependencies'
import { useAuth } from '../../../context/auth'
import { Pages } from '../../../pages/pages'

const CreateTravel: React.FC = () => {
  const travelRecipe = useAppSelector((state: RootState) => state.travelRecipe)
  const dispatch = useAppDispatch()
  const { getApiService, getToastUtils } = useDependencies()
  const apiService = getApiService()
  const { token } = useAuth()
  const travelService = apiService.getTravel(token)
  const toastUtils = getToastUtils()
  const navigate = useNavigate()

  const putTravel = async () => {
    try {
      await travelService.createTravelRecipe(travelRecipe)
      toastUtils.Toast.showToast(
        toastUtils.types.SUCCESS,
        'Udało ci się poprawnie stworzyć plan wycieczki',
      )
      navigate(Pages.DASHBOARD.getRedirectLink())
    } catch (err) {
      toastUtils.Toast.showToast(
        toastUtils.types.ERROR,
        'Podczas tworzenia wycieczki wystąpił nieoczekiwany błąd',
      )
    }
  }

  return (
    <Stack
      gap={3}
    >
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
          Przeglądaj poszczególne dni swojej wycieczki
        </h2>

        <TravelDaysTable.Component />
      </Stack>

      <Button
        type="button"
        variant="contained"
        onClick={putTravel}
      >
        Zapisz plan wycieczki
      </Button>
    </Stack>
  )
}

export default CreateTravel
