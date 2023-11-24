import React from 'react'
import {
  Button, Stack, TableCell, TableRow, useTheme,
} from '@mui/material'
import { Restaurant as RestaurantIcon } from '@mui/icons-material'
import { TravelElement } from '../../../../model'
import { deleteActivityFromTravel } from '../../../../features/travelRecipe/travelRecipeSlice'
import { useAppDispatch } from '../../../../app/hooks'

type Props = {
  travelElement: TravelElement
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
        {props.travelElement.from.toString()} - {props.travelElement.to.toString()}
      </TableCell>
      <TableCell> {props.travelElement.activity.name} </TableCell>
      <TableCell>
        { props.travelElement.activity.customParameters.place
          ? props.travelElement.activity.customParameters.place
          : `${props.travelElement.activity.customParameters.from} - ${props.travelElement.activity.customParameters.to}`}
      </TableCell>
      <TableCell> { formatter.format(props.travelElement.price) } </TableCell>
      <TableCell>
        <Stack>
          <Button
            type="button"
            variant="contained"
            color="error"
            onClick={() => deleteActivity(props.travelElement.id)}
          >
            Odwołaj
          </Button>
        </Stack>
      </TableCell>
    </TableRow>
  )
}

export default Restaurant
