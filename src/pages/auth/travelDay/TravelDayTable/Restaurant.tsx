import React from 'react'
import {
  TableCell, TableRow, useTheme,
} from '@mui/material'
import { Cancel, Restaurant as RestaurantIcon } from '@mui/icons-material'
import { LocallyTravelElement } from '../../../../model'
import { deleteActivityFromTravel } from '../../../../features/travelRecipe/travelRecipeSlice'
import { useAppDispatch } from '../../../../app/hooks'
import { DateHandler } from '../../../../utils/Date'

type Props = {
  travelElement: LocallyTravelElement
}

const Restaurant: React.FC<Props> = (props) => {
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
        <RestaurantIcon
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
      <TableCell />
      <TableCell> { formatter.format(props.travelElement.price) } </TableCell>
      <TableCell
        align="center"
      >
        <Cancel
          color="error"
          onClick={() => { deleteActivity(props.travelElement.id) }}
          sx={{
            cursor: 'pointer',
          }}
        />
      </TableCell>

    </TableRow>
  )
}

export default Restaurant
