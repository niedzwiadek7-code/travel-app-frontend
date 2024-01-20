import React from 'react'
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import dayjs from 'dayjs'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../../../app/hooks'
import { RootState } from '../../../../app/store'
import { Pages } from '../../../pages'

dayjs.extend(isSameOrBefore)

const TripTable: React.FC = () => {
  const navigate = useNavigate()
  const travelInstance = useAppSelector((state: RootState) => state.travelInstance)

  const travelElements: Record<string, { passed: number, count: number }> = {}

  travelInstance.travelElements.forEach((elem) => {
    const dateString = dayjs(elem.from).format('YYYY-MM-DD')

    if (!travelElements[dateString]) {
      travelElements[dateString] = {
        passed: 0,
        count: 0,
      }
    }

    travelElements[dateString].passed += elem.passed ? 1 : 0
    travelElements[dateString].count += 1
  })

  const dates = Object.keys(travelElements).sort((a, b) => (dayjs(a).isSameOrBefore(b) ? -1 : 1))

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell> Dzień </TableCell>
            <TableCell> Zakończone aktywności </TableCell>
            <TableCell> Przeglądaj </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {
            dates.map((date) => (
              <TableRow key={date}>
                <TableCell> {date} </TableCell>
                <TableCell>
                  {travelElements[date].passed} / {travelElements[date].count}
                  ({ ((travelElements[date].passed / travelElements[date].count) * 100)
                    .toFixed(2) }%)
                </TableCell>
                <TableCell>
                  <Button
                    type="button"
                    variant="contained"
                    onClick={() => navigate(Pages.TAKING_TRIP_DAY.getRedirectLink({
                      date,
                    }))}
                  >
                    Przeglądaj
                  </Button>
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TripTable
