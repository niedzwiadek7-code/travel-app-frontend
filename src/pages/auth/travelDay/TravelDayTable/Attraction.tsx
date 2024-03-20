import React from 'react'
import {
  Button, Stack, TableCell, TableRow, useTheme,
} from '@mui/material'
import { Attractions } from '@mui/icons-material'
import { LocallyTravelElement } from '../../../../model'
import { deleteActivityFromTravel } from '../../../../features/travelRecipe/travelRecipeSlice'
import { useAppDispatch } from '../../../../app/hooks'

type Props = {
  travelElement: LocallyTravelElement
}

const Attraction: React.FC<Props> = (props) => {
  const theme = useTheme()
  const dispatch = useAppDispatch()

  const deleteActivity = (id: string) => {
    dispatch(deleteActivityFromTravel(id))
  }

  const formatter = Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'PLN',
  })

  const dateToStr = (obj: { hour: number, minute: number }) => {
    const hour = obj.hour >= 10 ? `${obj.hour}` : `0${obj.hour}`
    const minute = obj.minute >= 10 ? `${obj.minute}` : `0${obj.minute}`
    return `${hour}:${minute}`
  }

  return (
    <TableRow key={`${props.travelElement.from}-${props.travelElement.to}`}>
      <TableCell>
        <Attractions
          style={{ fill: theme.palette.primary.main }}
        />
      </TableCell>
      <TableCell>
        {dateToStr(props.travelElement.from)} - {dateToStr(props.travelElement.to)}
      </TableCell>
      <TableCell> {props.travelElement.activity.name} </TableCell>
      <TableCell>
        { props.travelElement.activity.place
          ? props.travelElement.activity.place
          : `${props.travelElement.activity.from} - ${props.travelElement.activity.to}`}
      </TableCell>
      <TableCell> {props.travelElement.numberOfPeople} </TableCell>
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

export default Attraction
