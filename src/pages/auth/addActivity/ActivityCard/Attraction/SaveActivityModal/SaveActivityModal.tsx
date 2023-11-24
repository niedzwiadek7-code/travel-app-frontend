import React, { useState } from 'react'
import {
  Button, Stack,
} from '@mui/material'
import { LocalizationProvider, SingleInputTimeRangeField } from '@mui/x-date-pickers-pro'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { useNavigate } from 'react-router-dom'
import { v4 as uuid4v } from 'uuid'
import { useAppDispatch } from '../../../../../../app/hooks'
import * as Modal from '../../../../../../components/UI/Modal'
import { Activity as ActivityEntity, Date, TravelElement } from '../../../../../../model'
import { Pages } from '../../../../../pages'
import { putActivity } from '../../../../../../features/travelRecipe/travelRecipeSlice'
import { useDependencies } from '../../../../../../context/dependencies'

type Props = {
  activity: ActivityEntity,
  countDay: string,
}

const SaveActivityModal: React.FC<Props> = (props) => {
  const { getToastUtils } = useDependencies()
  const [range, setRange] = useState<Date[]>([])
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const setDatesFn = (dates: any[]) => {
    const rangeTemp: Date[] = []
    dates.forEach((date) => {
      if (date && date.hour() && date.minute()) {
        rangeTemp.push(new Date(date.toString()))
      }
    })
    setRange(rangeTemp)
  }

  const putTravelElement = () => {
    if (!range[0] || !range[1]) {
      const toastUtils = getToastUtils()
      toastUtils.Toast.showToast(
        toastUtils.types.ERROR,
        'Podane godziny są niepoprawne',
      )
      return
    }

    if (Date.compareDates(range[1], range[0]) < 0) {
      const toastUtils = getToastUtils()
      toastUtils.Toast.showToast(
        toastUtils.types.ERROR,
        'Czas rozpoczęcia aktywności musi być wcześniejszy niż czas jej zakończenia',
      )
      return
    }

    const getTotalPrice = () => {
      if (props.activity.customParameters.price_type === 'per_entry') {
        return props.activity.price
      }
      return Date.timeDiff(range[0], range[1]) * props.activity.price
    }

    const travelElement = new TravelElement({
      id: uuid4v(),
      dayCount: parseInt(props.countDay, 10),
      from: range[0],
      to: range[1],
      activity: props.activity,
      price: getTotalPrice(),
    })
    dispatch(putActivity(travelElement))
    navigate(Pages.TRAVEL_DAY.getRedirectLink({
      countDay: props.countDay,
    }))
  }

  return (
    <Modal.Component
      buttonComponent={(
        <Button
          type="button"
          variant="contained"
          sx={{ width: '100%' }}
        >
          Skorzystaj z oferty
        </Button>
      )}
      title={props.activity.name}
      content={(
        <Stack>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['SingleInputTimeRangeField']}>
              <SingleInputTimeRangeField
                ampm={false}
                label="Zaplanuj w terminie"
                onChange={setDatesFn}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Stack>
      )}
      actions={[
        {
          name: 'Dodaj do wycieczki',
          onClick: putTravelElement,
        },
      ]}
    />
  )
}

export default SaveActivityModal
