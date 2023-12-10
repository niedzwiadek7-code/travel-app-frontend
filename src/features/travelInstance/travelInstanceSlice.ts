import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TravelInstance } from '../../model'

const initialState: TravelInstance = new TravelInstance({})

export const travelInstanceSlice = createSlice({
  name: 'travelSlice',
  initialState,
  reducers: {
    setNewTravelInstance: (state, action: PayloadAction<TravelInstance>) => ({
      ...action.payload,
    }),
    passTravelElementInstance: (state, action: PayloadAction<string>) => {
      const travelElements = state.travelElements.map((elem) => {
        if (elem.id !== action.payload) {
          return elem
        }
        return {
          ...elem,
          passed: true,
        }
      })

      return {
        ...state,
        travelElements,
      }
    },
    cancelTravelElementInstance: (state, action: PayloadAction<string>) => {
      const travelElements = state.travelElements.filter(
        (elem) => elem.id !== action.payload,
      )

      return {
        ...state,
        travelElements,
      }
    },
  },
})

export const {
  setNewTravelInstance,
  passTravelElementInstance,
  cancelTravelElementInstance,
} = travelInstanceSlice.actions

export default travelInstanceSlice.reducer
