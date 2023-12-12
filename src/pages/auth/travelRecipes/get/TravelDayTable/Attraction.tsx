import React from 'react'
import {
  TableCell, TableRow, useTheme,
} from '@mui/material'
import { Attractions } from '@mui/icons-material'
import { TravelElement } from '../../../../../model'

type Props = {
  travelElement: TravelElement
}

const Attraction: React.FC<Props> = (props) => {
  const theme = useTheme()

  const formatter = Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'PLN',
  })

  return (
    <TableRow key={`${props.travelElement.from}-${props.travelElement.to}`}>
      <TableCell>
        <Attractions
          style={{ fill: theme.palette.primary.main }}
        />
      </TableCell>
      <TableCell>
        {props.travelElement.from.toString()} - {props.travelElement.to.toString()}
      </TableCell>
      <TableCell> {props.travelElement.activity.name} </TableCell>
      <TableCell>
        { props.travelElement.activity.place
          ? props.travelElement.activity.place
          : `${props.travelElement.activity.from} - ${props.travelElement.activity.to}`}
      </TableCell>
      <TableCell> {props.travelElement.numberOfPeople} </TableCell>
      <TableCell> { formatter.format(props.travelElement.price) } </TableCell>
    </TableRow>
  )
}

export default Attraction
