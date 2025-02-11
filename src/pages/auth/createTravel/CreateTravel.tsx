import React, { useState } from 'react'
import {
  Button, Stack,
} from '@mui/material'
import { AddCircle, Create as CreateIcon } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation('translation', { keyPrefix: 'travel_page' })

  const planNextDay = () => {
    dispatch(addCountDays(1))
    navigate(Pages.TRAVEL_DAY.getRedirectLink({
      countDay: (travelRecipe.countDays + 1).toString(),
    }))
  }

  const fetchData = async (): Promise<TravelRecipe | undefined> => {
    if (params.id) {
      if (!travelRecipe.id || travelRecipe.id.toString() !== params.id) {
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
          t('edit_travel_success'),
        )
        navigate(Pages.TRAVEL_RECIPES_STORE.getRedirectLink())
      } else {
        await travelService.createTravelRecipe(travelRecipe)
        toastUtils.Toast.showToast(
          toastUtils.types.SUCCESS,
          t('create_travel_success'),
        )
        navigate(Pages.TRAVEL_RECIPES_STORE.getRedirectLink())
      }
      setBtnLoading(false)
    } catch (err) {
      setBtnLoading(false)
      toastUtils.Toast.showToast(
        toastUtils.types.ERROR,
        t('error'),
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
      <Stack
        direction="row"
        alignItems="center"
      >
        <Input.Component
          variant={Input.Variant.STANDARD}
          type={Input.Type.TEXT}
          label={t('trip_name')}
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
                label={t('trip_days')}
                name="countDays"
                register={register}
                validation={['required', 'minNum:1']}
                error={errors?.countDays?.message || ''}
              />

              <Button
                type="submit"
                variant="contained"
              >
                {t('confirm')}
              </Button>
            </Stack>
          </form>

        ) : (
          <>
            <Collapse.Component
              title={t('summary')}
            >
              <TravelSummaryTable.Component />
            </Collapse.Component>

            <TravelGloballyElem.Component
              title={t('accommodation')}
              travelElements={travelRecipe.accommodations}
              deleteTravelElement={
                (elemId: string) => dispatch(deleteAccommodationFromTravel(elemId))
              }
              activityType="Accommodation"
            />

            <Collapse.Component
              defaultOpen
              title={t('browse_trip')}
              nodeOptions={[
                <AddCircle
                  key="add-day"
                  color="success"
                  onClick={planNextDay}
                  sx={{ cursor: 'pointer' }}
                />,
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
                  ? t('edit_travel')
                  : t('create_travel')
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
                  {t('reset')}
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
        onClick={() => navigate(Pages.TRAVEL_RECIPES_STORE.getRedirectLink())}
      >
        {t('back')}
      </Button>
    </Stack>
  )
}

export default CreateTravel
