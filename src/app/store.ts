import { configureStore } from '@reduxjs/toolkit'
import travelRecipeReducer from '../features/travelRecipe/travelRecipeSlice'
import travelInstanceSlice from '../features/travelInstance/travelInstanceSlice'

const store = configureStore({
  reducer: {
    travelRecipe: travelRecipeReducer,
    travelInstance: travelInstanceSlice,
  },
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
