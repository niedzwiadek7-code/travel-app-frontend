import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TravelInstance, ElementTravelInstance, AccommodationElementInstance } from '../../model'

const initialState: TravelInstance = new TravelInstance({})

export const travelInstanceSlice = createSlice({
  name: 'travelSlice',
  initialState,
  reducers: {
    setNewTravelInstance: (state, action: PayloadAction<TravelInstance>) => ({
      ...action.payload,
    }),
    passTravelElementInstance: (state, action: PayloadAction<{ id: string, photos: string[] }>) => {
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
    passAccommodationElementInstance: (
      state,
      action: PayloadAction<{ id: string, photos: string[] }>,
    ) => {
      const accommodationElements = state.accommodationElements.map((elem) => {
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
        accommodationElements,
      }
    },
    putActivityInstance: (state, action: PayloadAction<ElementTravelInstance>) => ({
      ...state,
      travelElements: [...state.travelElements, action.payload],
    }),
    putAccommodationInstance: (state, action: PayloadAction<AccommodationElementInstance>) => ({
      ...state,
      accommodationElements: [...state.accommodationElements, action.payload],
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
  putAccommodationInstance,
} = travelInstanceSlice.actions

export default travelInstanceSlice.reducer
