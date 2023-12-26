import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Page from './class/Page'
import * as Public from './public'
import * as Auth from './auth'

export const Pages: Record<string, Page> = {
  WELCOME: new Page(
    '/',
    <Public.Welcome.Component />,
  ),
  LOGIN: new Page(
    '/login',
    <Public.Login.Component />,
  ),
  REGISTER: new Page(
    '/register',
    <Public.Register.Component />,
  ),

  DASHBOARD: new Page(
    '/dashboard',
    <Auth.Dashboard.Component />,
  ),
  CREATE_TRAVEL: new Page(
    '/create-travel',
    <Auth.CreateTravel.Component />,
  ),
  EDIT_TRAVEL: new Page(
    '/edit-travel/:id',
    <Auth.CreateTravel.Component />,
  ),
  TRAVEL_DAY: new Page(
    '/travel-day/:countDay',
    <Auth.TravelDay.Component />,
  ),
  ADD_ACTIVITY: new Page(
    '/add-activity',
    <Auth.AddActivity.Component />,
  ),
  ADD_ACCOMMODATION: new Page(
    '/add-accommodation',
    <Auth.AddAccommodation.Component />,
  ),

  ACTIVITY_CREATE: new Page(
    '/activity/add',
    <Auth.ActivityForm.Component />,
  ),
  ACTIVITY_EDIT: new Page(
    '/activity/edit/:id',
    <Auth.ActivityForm.Component />,
  ),

  ACCOMMODATION_CREATE: new Page(
    '/accommodation/add',
    <Auth.AccommodationForm.Component />,
  ),
  ACCOMMODATION_EDIT: new Page(
    '/accommodation/edit/:id',
    <Auth.AccommodationForm.Component />,
  ),

  TRAVEL_RECIPES_STORE: new Page(
    '/travel-recipes',
    <Auth.TravelRecipesStore.Component />,
  ),
  TRAVEL_RECIPES_GET: new Page(
    '/travel-recipe/:id',
    <Auth.TravelRecipesGet.Component />,
  ),

  TAKING_TRIP: new Page(
    '/taking-trip/:id',
    <Auth.TakingTrip.Component />,
  ),
  TAKING_TRIP_DAY: new Page(
    '/taking-trip-day/:date',
    <Auth.TakingTripDay.Component />,
  ),
  REALIZED_TRIPS: new Page(
    '/realized-trips',
    <Auth.RealizedTrips.Component />,
  ),
}

const App: React.FC = () => (
  <Routes>
    {Object.keys(Pages).map((key) => (
      <Route
        key={key}
        path={Pages[key].link}
        element={Pages[key].component}
      />
    ))}
  </Routes>
)

export default App
