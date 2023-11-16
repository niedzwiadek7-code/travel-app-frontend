/* eslint-disable no-param-reassign */

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TravelRecipe } from '../../model'

const initialState: TravelRecipe = new TravelRecipe({
  name: 'Wycieczka',
})

export const travelRecipeSlice = createSlice({
  name: 'travelRecipe',
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => ({
      ...state,
      name: action.payload,
    }),
    reset: () => new TravelRecipe({}),
  },
})

export const { setName, reset } = travelRecipeSlice.actions

export default travelRecipeSlice.reducer
