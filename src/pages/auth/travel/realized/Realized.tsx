import { ProcessedEvent, SchedulerHelpers } from '@aldabil/react-scheduler/types'
import React from 'react'
import { Scheduler } from '@aldabil/react-scheduler'
import { Stack, useTheme } from '@mui/material'
import { ReceiptLong } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import { grey, green } from '@mui/material/colors'
import * as Header from '../../../../components/Header'
import { useAuth, useDependencies } from '../../../../context'
import { TravelInstance } from '../../../../model'
import { useFetch } from '../../../../hooks'
import * as Loading from '../../../../components/UI/Loading'
import { DateHandler } from '../../../../utils/Date'

const RealizedTrips: React.FC = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'realized_trips_page' })
  const { getApiService, getToastUtils } = useDependencies()
  const apiService = getApiService()
  const toastUtils = getToastUtils()
  const { token } = useAuth()
  const travelService = apiService.getTravel(token)
  const theme = useTheme()

  const editTravelInstance = (event: ProcessedEvent) => {
    console.log(event.event_id)
  }

  const deleteTravelInstance = async (
    event: DragEvent,
    droppedOn: Date,
    updatedEvent: ProcessedEvent,
    originalEvent: ProcessedEvent,
  ) => {
    console.log(event, droppedOn, updatedEvent, originalEvent)
    try {
      await travelService.deleteInstance(originalEvent.event_id.toString())
      // const travelInstancesTemp = travelInstances.filter((elem) => elem.id.toString() !== id)
      // setTravelInstances(travelInstancesTemp)
    } catch (err) {
      toastUtils.Toast.showToast(
        toastUtils.types.ERROR,
        t('error'),
      )
    }
  }

  const fetchData = async (): Promise<ProcessedEvent[] | []> => {
    try {
      const travelInstances = await travelService.getAllTravelInstances()

      const getColor = (travelInstance: TravelInstance) => {
        if (DateHandler.diff(new DateHandler().toISOString(), travelInstance.from, 'day') < 0) {
          return grey[700]
        }
        if (DateHandler.diff(new DateHandler().toISOString(), travelInstance.to, 'day') > 0) {
          return green[700]
        }
        return theme.palette.primary.main
      }

      return travelInstances.map((travelInstance: TravelInstance) => ({
        event_id: travelInstance.id,
        title: travelInstance.travelRecipe.name,
        start: new DateHandler(travelInstance.from).toDateObj(),
        end: new DateHandler(travelInstance.to).toDateObj(),
        color: getColor(travelInstance),
      }))
    } catch (err) {
      toastUtils.Toast.showToast(
        toastUtils.types.ERROR,
        t('error'),
      )
      return []
    }
  }

  const {
    data: travelInstances,
    loading,
  } = useFetch<ProcessedEvent[]>({
    fetchData,
    defaultData: [],
  })

  if (loading) {
    return (
      <Loading.Component />
    )
  }

  return (
    <Stack
      gap={2}
    >
      <Header.Component
        title={t('title')}
        icon={(
          <ReceiptLong
            fontSize="large"
          />
        )}
      />

      <Scheduler
        // agenda
        // onConfirm={confirmFn}
        // selectedDate={new Date(new Date().setMonth(10))}
        // alwaysShowAgendaDays
        stickyNavigation
        // navigation={false}
        view="month"
        events={travelInstances}
        resourceViewMode="tabs"
        disableViewNavigator
        onEventEdit={editTravelInstance}
        onEventDrop={deleteTravelInstance}
        // navigationPickerProps={[]}
      />
    </Stack>

  )
}

export default RealizedTrips
