import React, { useEffect, useState } from 'react'
import {
  Button,
  Stack,
  Typography,
} from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { Create as CreateIcon } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import * as Input from '../../../components/UI/Input'
import {
  setName, setNewTravelRecipe, reset, deleteAccommodationFromTravel,
} from '../../../features/travelRecipe/travelRecipeSlice'
import { RootState } from '../../../app/store'
import * as TravelDaysTable from './TravelDaysTable'
import * as TravelSummaryTable from './TravelSummaryTable'
import { useDependencies, useAuth } from '../../../context'
import { Pages } from '../../pages'
import * as Loading from '../../../components/UI/Loading'
import * as Header from '../../../components/Header'
import * as TravelGloballyElem from './TravelGloballyElem'

const CreateTravel: React.FC = () => {
  const { id } = useParams()
  const [loading, setLoading] = useState<boolean>(false)
  const [btnLoading, setBtnLoading] = useState<boolean>(false)

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
      } else if (travelRecipe.id) {
        dispatch(reset())
      }
    }
    fetchData()
  }, [id])

  const putTravel = async () => {
    try {
      setBtnLoading(true)
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
      setBtnLoading(false)
    } catch (err) {
      setBtnLoading(false)
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
          name="name"
          onChange={(value: string) => {
            dispatch(setName(value))
          }}
        />
      </Stack>

      <Stack>
        <Typography
          variant="h5"
          component="h5"
        >
          Podsumowanie
        </Typography>

        <TravelSummaryTable.Component />
      </Stack>

      <TravelGloballyElem.Component
        title="Noclegi"
        travelElements={travelRecipe.accommodations}
        deleteTravelElement={(elemId: string) => dispatch(deleteAccommodationFromTravel(elemId))}
        activityType="Accommodation"
      />

      <Stack>
        <Typography
          variant="h5"
          component="h5"
        >
          Przeglądaj poszczególne dni swojej wycieczki
        </Typography>

        <TravelDaysTable.Component />
      </Stack>

      <Stack
        gap={1}
      >
        <LoadingButton
          type="button"
          variant="contained"
          onClick={putTravel}
          loading={btnLoading}
        >
          {
            travelRecipe.id
              ? 'Edytuj plan wycieczki'
              : 'Zapisz plan wycieczki'
          }
        </LoadingButton>

        {
          !travelRecipe.id && (
            <Button
              type="button"
              color="error"
              variant="contained"
              onClick={() => dispatch(reset())}
            >
              Resetuj wycieczkę
            </Button>
          )
        }

        <Button
          type="button"
          variant="outlined"
          onClick={() => navigate(Pages.DASHBOARD.getRedirectLink())}
        >
          Powrót na stronę główną
        </Button>
      </Stack>
    </Stack>
  )
}

export default CreateTravel
