import React from 'react'
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from '@mui/material'
import { useAppSelector } from '../../../../../app/hooks'
import { RootState } from '../../../../../app/store'
import { Date as DateModel } from '../../../../../model'
import Travel from './Travel'
import Attraction from './Attraction'
import Restaurant from './Restaurant'

type Props = {
  countDay: number
}

const TravelDayTable: React.FC<Props> = (props) => {
  const travelElements = useAppSelector((state: RootState) => state.travelRecipe.travelElements)
  const travelElementsThisDay = travelElements.filter(
    (e) => e.dayCount === props.countDay,
  ).sort(
    (a, b) => DateModel.compareDates(a.from, b.from),
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
          </TableRow>
        </TableHead>

        <TableBody>
          {travelElementsThisDay.map((elem) => {
            switch (elem.activity.activityType) {
              case 'Podróż':
                return (
                  <Travel
                    travelElement={elem}
                  />
                )
              case 'Atrakcja':
                return (
                  <Attraction
                    travelElement={elem}
                  />
                )
              case 'Restauracja':
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
