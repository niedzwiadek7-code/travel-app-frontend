import {
  Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow,
} from '@mui/material'
import React from 'react'
import { useAppSelector } from '../../../../app/hooks'
import { RootState } from '../../../../app/store'
import { Date } from '../../../../model'

const TravelSummaryTable: React.FC = () => {
  const formatter = Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'PLN',
  })

  const travelElements = useAppSelector((state: RootState) => state.travelRecipe.travelElements)

  const activityTypes = [
    'Restauracja',
    'Podróż',
    'Nocleg',
    'Atrakcja',
  ]

  const getTime = (activityType?: string) => {
    const elements = activityType
      ? travelElements.filter((elem) => elem.activity.activityType === activityType)
      : travelElements

    const minutesSum = elements.reduce(
      (acc, value) => acc + Date.timeDiff(value.from, value.to),
      0,
    )

    const hours = Math.floor(minutesSum / 60)
    const minutes = minutesSum % 60

    return `${hours}h ${minutes}min`
  }

  const getPrice = (activityType?: string) => {
    const elements = activityType
      ? travelElements.filter((elem) => elem.activity.activityType === activityType)
      : travelElements

    const price = elements.reduce(
      (acc, value) => acc + value.price,
      0,
    )

    return formatter.format(price)
  }

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell> Kategoria </TableCell>
            <TableCell> Spędzony czas </TableCell>
            <TableCell> Cena </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {activityTypes.map((type) => (
            <TableRow key={type}>
              <TableCell>{type}</TableCell>
              <TableCell> { getTime(type) } </TableCell>
              <TableCell> { getPrice(type) } </TableCell>
            </TableRow>
          ))}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableCell> Suma </TableCell>
            <TableCell> { getTime() } </TableCell>
            <TableCell> { getPrice() } </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  )
}

export default TravelSummaryTable
