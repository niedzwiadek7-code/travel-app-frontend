import {
  Stack,
  Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow,
} from '@mui/material'
import React from 'react'
import { useAppSelector } from '../../../../app/hooks'
import { RootState } from '../../../../app/store'
import { DateHandler } from '../../../../utils/Date'
import { ActivityType, getActivityTypeIcon } from '../../../../model'

const TravelSummaryTable: React.FC = () => {
  const formatter = Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'PLN',
  })

  const travelElements = useAppSelector((state: RootState) => state.travelRecipe.travelElements)
  const accommodations = useAppSelector((state: RootState) => state.travelRecipe.accommodations)

  const activityTypes: Record<ActivityType, string> = {
    Restaurant: 'Restauracja',
    Trip: 'Podróż',
    Accommodation: 'Zakwaterowanie',
    Attraction: 'Atrakcja',
  }

  const getTime = (activityType?: ActivityType) => {
    if (activityType === 'Accommodation') {
      return 'nie dotyczy'
    }

    const elements = activityType
      ? travelElements.filter((elem) => elem.activity.activityType === activityType)
      : travelElements

    const minutesSum = elements.reduce(
      (acc, value) => acc + DateHandler.diff(value.to, value.from, 'minutes'),
      0,
    )

    const hours = Math.floor(minutesSum / 60)
    const minutes = minutesSum % 60

    return `${hours}h ${minutes}min`
  }

  const getPrice = (activityType?: ActivityType) => {
    if (activityType === 'Accommodation') {
      const price = accommodations.reduce(
        (acc, value) => acc + value.price,
        0,
      )
      return formatter.format(price)
    }

    const elements = activityType
      ? travelElements.filter((elem) => elem.activity.activityType === activityType)
      : travelElements

    const price = elements.reduce(
      (acc, value) => acc + value.price,
      0,
    )

    if (!activityType) {
      const accommodationsPrice = accommodations.reduce(
        (acc, value) => acc + value.price,
        0,
      )

      return formatter.format(price + accommodationsPrice)
    }

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
          {Object.entries(activityTypes).map(([typeString, name]) => {
            const type = typeString as ActivityType
            const Icon = getActivityTypeIcon(type)
            return (
              <TableRow key={type}>
                <TableCell>
                  <Stack
                    direction="row"
                    alignItems="center"
                    gap={1}
                  >
                    <Icon
                      fontSize="small"
                      color="primary"
                    />
                    {name}
                  </Stack>
                </TableCell>
                <TableCell> { getTime(type) } </TableCell>
                <TableCell> { getPrice(type) } </TableCell>
              </TableRow>
            )
          })}
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
