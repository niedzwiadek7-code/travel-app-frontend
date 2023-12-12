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
    cancelAccommodationElementInstance: (state, action: PayloadAction<string>) => {
      const accommodationElements = state.accommodationElements.filter(
        (elem) => elem.id.toString() !== action.payload,
      )

      return {
        ...state,
        accommodationElements,
      }
    },
    passAccommodationElementInstance: (state, action: PayloadAction<string>) => {
      const accommodationElements = state.accommodationElements.map((elem) => {
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
        accommodationElements,
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
  cancelAccommodationElementInstance,
  passAccommodationElementInstance,
  putActivityInstance,
} = travelInstanceSlice.actions

export default travelInstanceSlice.reducer
