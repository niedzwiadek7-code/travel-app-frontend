import React, { useState } from 'react'
import {
  Button, Stack,
} from '@mui/material'
import { AddCircle, Create as CreateIcon } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { useForm } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import * as Input from '../../../components/UI/Input'
import {
  setName, setNewTravelRecipe, reset, deleteAccommodationFromTravel, addCountDays,
} from '../../../features/travelRecipe/travelRecipeSlice'
import { RootState } from '../../../app/store'
import * as TravelDaysTable from './TravelDaysTable'
import * as TravelSummaryTable from './TravelSummaryTable'
import { useDependencies } from '../../../context'
import { Pages } from '../../pages'
import * as Loading from '../../../components/UI/Loading'
import * as Header from '../../../components/Header'
import * as TravelGloballyElem from './TravelGloballyElem'
import { useRouter, useFetch } from '../../../hooks'
import { TravelRecipe } from '../../../model'
import * as Collapse from '../../../components/UI/Collapse'

type Params = {
  id: string | undefined
}

type CountDaysInput = {
  countDays: string
}

const CreateTravel: React.FC = () => {
  const {
    navigate,
    params,
    token,
  } = useRouter<
    Record<string, any>,
    Record<string, any>,
    Params
  >()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CountDaysInput>()

  const [btnLoading, setBtnLoading] = useState<boolean>(false)
  const travelRecipe = useAppSelector((state: RootState) => state.travelRecipe)
  const dispatch = useAppDispatch()
  const { getApiService, getToastUtils } = useDependencies()
  const apiService = getApiService()
  const travelService = apiService.getTravel(token)
  const toastUtils = getToastUtils()

  const planNextDay = () => {
    dispatch(addCountDays(1))
    navigate(Pages.TRAVEL_DAY.getRedirectLink({
      countDay: (travelRecipe.countDays + 1).toString(),
    }))
  }

  const fetchData = async (): Promise<TravelRecipe | undefined> => {
    if (params.id) {
      if (!travelRecipe.id) {
        const travelRecipeTemp = await travelService.get(params.id)
        dispatch(setNewTravelRecipe(travelRecipeTemp))
        return travelRecipeTemp
      }
    } else if (travelRecipe.id) {
      dispatch(reset())
    }
    return undefined
  }

  const {
    loading,
  } = useFetch<TravelRecipe>({
    fetchData,
    defaultData: undefined,
  }, [params.id])

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

  const onSubmit = async (data: CountDaysInput) => {
    dispatch(addCountDays(+data.countDays))
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

      {
        travelRecipe.countDays === 0 ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack
              gap={2}
            >
              <Input.Component
                variant={Input.Variant.STANDARD}
                type={Input.Type.NUMBER}
                label="Na ile dni planujesz swoją wycieczkę?"
                name="countDays"
                register={register}
                validation={['required', 'minNum:1']}
                error={errors?.countDays?.message || ''}
              />

              <Button
                type="submit"
                variant="contained"
              >
                Zatwierdź
              </Button>
            </Stack>
          </form>

        ) : (
          <>
            <Collapse.Component
              title="Podsumowanie"
            >
              <TravelSummaryTable.Component />
            </Collapse.Component>

            <TravelGloballyElem.Component
              title="Noclegi"
              travelElements={travelRecipe.accommodations}
              deleteTravelElement={
                (elemId: string) => dispatch(deleteAccommodationFromTravel(elemId))
              }
              activityType="Accommodation"
            />

            <Collapse.Component
              defaultOpen
              title="Przeglądaj poszczególne dni swojej wycieczki"
              nodeOptions={[
                <Button
                  key="addDay"
                  type="button"
                  onClick={planNextDay}
                >
                  <AddCircle
                    color="success"
                  />
                </Button>,
              ]}
            >
              <TravelDaysTable.Component />
            </Collapse.Component>

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

            </Stack>
          </>
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
  )
}

export default CreateTravel
