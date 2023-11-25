import React from 'react'
import {
  Stack,
} from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import * as Input from '../../../components/UI/Input'
import { setName } from '../../../features/travelRecipe/travelRecipeSlice'
import { RootState } from '../../../app/store'
import * as TravelDaysTable from './TravelDaysTable'
import * as TravelSummaryTable from './TravelSummaryTable'

const CreateTravel: React.FC = () => {
  const travelRecipe = useAppSelector((state: RootState) => state.travelRecipe)
  const dispatch = useAppDispatch()

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
    </Stack>
  )
}

export default CreateTravel
