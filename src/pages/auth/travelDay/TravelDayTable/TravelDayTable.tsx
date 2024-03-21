import React from 'react'
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from '@mui/material'
import { useAppSelector } from '../../../../app/hooks'
import { RootState } from '../../../../app/store'
import Accommodation from './Accommodation'
import Attraction from './Attraction'
import Restaurant from './Restaurant'
import Travel from './Travel'
import { DateHandler } from '../../../../utils/Date'

type Props = {
  countDay: number
}

const TravelDayTable: React.FC<Props> = (props) => {
  const travelElements = useAppSelector((state: RootState) => state.travelRecipe.travelElements)
  const travelElementsThisDay = travelElements.filter(
    (e) => e.dayCount === props.countDay,
  ).sort(
    (a, b) => DateHandler.compareDates(b.from, a.from),
  )

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell> Ramy czasowe </TableCell>
            <TableCell> Aktywność </TableCell>
            <TableCell> Miejsce </TableCell>
            <TableCell> Ilość osób </TableCell>
            <TableCell> Cena </TableCell>
            <TableCell> Akcja </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {travelElementsThisDay.map((elem) => {
            switch (elem.activity.activityType) {
              case 'Trip':
                return (
                  <Travel
                    travelElement={elem}
                  />
                )
              case 'Accommodation':
                return (
                  <Accommodation
                    travelElement={elem}
                  />
                )
              case 'Attraction':
                return (
                  <Attraction
                    travelElement={elem}
                  />
                )
              case 'Restaurant':
                return (
                  <Restaurant
                    travelElement={elem}
                  />
                )
              default:
                return <> </>
            }
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TravelDayTable
