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
  },
})

export const {
  setNewTravelInstance,
} = travelInstanceSlice.actions

export default travelInstanceSlice.reducer
