import React, { useState } from 'react'
import { Button, Stack, Typography } from '@mui/material'
import { LocalizationProvider, SingleInputTimeRangeField } from '@mui/x-date-pickers-pro'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { useNavigate } from 'react-router-dom'
import { v4 as uuid4v } from 'uuid'
import { useAppDispatch } from '../../../../app/hooks'
import * as Modal from '../../../../components/UI/Modal'
import { ActivityType, Date, TravelElement } from '../../../../model'
import { Pages } from '../../../../pages/pages'
import { putActivity } from '../../../../features/travelRecipe/travelRecipeSlice'

type Props = {
  activity: ActivityType,
  countDay: string,
}

const SaveActivityModal: React.FC<Props> = (props) => {
  // eslint-disable-next-line no-unused-vars
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
    const travelElement = new TravelElement({
      id: uuid4v(),
      dayCount: parseInt(props.countDay, 10),
      from: range[0],
      to: range[1],
      activity: props.activity,
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
          <Typography>
            Zaplanuj w terminie:
          </Typography>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['SingleInputTimeRangeField']}>
              <SingleInputTimeRangeField
                ampm={false}
                label="From - To"
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
