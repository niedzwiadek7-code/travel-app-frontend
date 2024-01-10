import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import travelRecipeReducer from '../features/travelRecipe/travelRecipeSlice'
import travelInstanceSlice from '../features/travelInstance/travelInstanceSlice'

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
  travelRecipe: travelRecipeReducer,
  travelInstance: travelInstanceSlice,
})

const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
})

export default store
export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
