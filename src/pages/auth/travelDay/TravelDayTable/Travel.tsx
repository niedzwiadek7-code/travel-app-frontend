import React from 'react'
import {
  Stack,
  TableCell, TableRow, useTheme,
} from '@mui/material'
import { AirplanemodeActive, Cancel, Edit } from '@mui/icons-material'
import { LocallyTravelElement } from '../../../../model'
import { deleteActivityFromTravel } from '../../../../features/travelRecipe/travelRecipeSlice'
import { useAppDispatch } from '../../../../app/hooks'
import { DateHandler } from '../../../../utils/Date'
import * as SaveActivityModal from '../../../../components/SaveActivityModal'

type Props = {
  travelElement: LocallyTravelElement
}

const Travel: React.FC<Props> = (props) => {
  const theme = useTheme()
  const dispatch = useAppDispatch()

  const deleteActivity = (id: string) => {
    dispatch(deleteActivityFromTravel(id))
  }

  const formatter = Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'PLN',
  })

  return (
    <TableRow key={`${props.travelElement.from}-${props.travelElement.to}`}>
      <TableCell>
        <AirplanemodeActive
          style={{ fill: theme.palette.primary.main }}
        />
      </TableCell>
      <TableCell>
        {new DateHandler(props.travelElement.from).format('HH:mm')} -
        {new DateHandler(props.travelElement.to).format('HH:mm')}
      </TableCell>
      <TableCell> {props.travelElement.activity.name} </TableCell>
      <TableCell>
        { props.travelElement.activity.place
          ? props.travelElement.activity.place
          : `${props.travelElement.activity.from} - ${props.travelElement.activity.to}`}
      </TableCell>
      <TableCell> {props.travelElement.numberOfPeople} </TableCell>
      <TableCell> { formatter.format(props.travelElement.price) } </TableCell>
      <TableCell
        align="center"
      >
        <Stack
          direction="row"
          justifyContent="end"
          gap={1}
        >
          <SaveActivityModal.Component
            button={(
              <Edit
                color="primary"
                sx={{
                  cursor: 'pointer',
                }}
              />
            )}
            travelElement={props.travelElement}
            activity={props.travelElement.activity}
            countDay={props.travelElement.dayCount.toString()}
          />
          <Cancel
            color="error"
            onClick={() => { deleteActivity(props.travelElement.id) }}
            sx={{
              cursor: 'pointer',
            }}
          />
        </Stack>
      </TableCell>
    </TableRow>
  )
}

export default Travel
