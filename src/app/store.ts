import { configureStore } from '@reduxjs/toolkit'
import travelRecipeReducer from '../features/travelRecipe/travelRecipeSlice'

const store = configureStore({
  reducer: {
    travelRecipe: travelRecipeReducer,
  },
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
