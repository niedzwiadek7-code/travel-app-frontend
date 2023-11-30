/* eslint-disable no-param-reassign */

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TravelRecipe, TravelElement } from '../../model'

const initialState: TravelRecipe = new TravelRecipe({
  name: 'Wycieczka',
  countDays: 0,
})

export const travelRecipeSlice = createSlice({
  name: 'travelRecipe',
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => ({
      ...state,
      name: action.payload,
    }),
    addCountDays: (state, action: PayloadAction<number>) => ({
      ...state,
      countDays: state.countDays + action.payload,
    }),
    putActivity: (state, action: PayloadAction<TravelElement>) => ({
      ...state,
      travelElements: [...state.travelElements, action.payload],
    }),
    deleteDayFromTravel: (state, action: PayloadAction<number>) => {
      const newTravelElements = state.travelElements.filter(
        (elem) => elem.dayCount !== action.payload,
      )
      return {
        ...state,
        travelElements: newTravelElements,
      }
    },
    deleteActivityFromTravel: (state, action: PayloadAction<string>) => {
      const newTravelElements = state.travelElements.filter(
        (elem) => elem.id !== action.payload,
      )
      return {
        ...state,
        travelElements: newTravelElements,
      }
    },
    reset: () => new TravelRecipe({}),
    setNewTravelRecipe: (state, action: PayloadAction<TravelRecipe>) => ({
      ...action.payload,
    }),
  },
})

export const {
  setName,
  reset,
  deleteDayFromTravel,
  addCountDays,
  putActivity,
  deleteActivityFromTravel,
  setNewTravelRecipe,
} = travelRecipeSlice.actions

export default travelRecipeSlice.reducer
