import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TravelInstance, ElementTravelInstance } from '../../model'

const initialState: TravelInstance = new TravelInstance({})

export const travelInstanceSlice = createSlice({
  name: 'travelSlice',
  initialState,
  reducers: {
    setNewTravelInstance: (state, action: PayloadAction<TravelInstance>) => ({
      ...action.payload,
    }),
    passTravelElementInstance: (state, action: PayloadAction<{ id: number, photos: string[] }>) => {
      const travelElements = state.travelElements.map((elem) => {
        if (elem.id !== action.payload.id) {
          return elem
        }
        return {
          ...elem,
          passed: true,
          photos: action.payload.photos,
        }
      })

      return {
        ...state,
        travelElements,
      }
    },
    cancelTravelElementInstance: (state, action: PayloadAction<number>) => {
      const travelElements = state.travelElements.filter(
        (elem) => elem.id !== action.payload,
      )

      return {
        ...state,
        travelElements,
      }
    },
    putActivityInstance: (state, action: PayloadAction<ElementTravelInstance>) => ({
      ...state,
      travelElements: [...state.travelElements, action.payload],
    }),
  },
})

export const {
  setNewTravelInstance,
  passTravelElementInstance,
  cancelTravelElementInstance,
  putActivityInstance,
} = travelInstanceSlice.actions

export default travelInstanceSlice.reducer
