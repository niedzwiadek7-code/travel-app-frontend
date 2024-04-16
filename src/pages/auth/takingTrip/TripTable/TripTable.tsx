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
import { useTranslation } from 'react-i18next'
import { useAppSelector } from '../../../../app/hooks'
import { RootState } from '../../../../app/store'
import { Pages } from '../../../pages'
import { DateHandler } from '../../../../utils/Date'
import { ActivityScope, locallyActivityTypes } from '../../../../model'
import { useRouter } from '../../../../hooks'

const TripTable: React.FC = () => {
  const {
    navigate,
  } = useRouter()
  const { t } = useTranslation('translation', { keyPrefix: 'taking_trip_page.trip_table' })

  const travelInstance = useAppSelector((state: RootState) => state.travelInstance)

  const travelElements: Record<string, { passed: number, count: number }> = {}

  travelInstance.travelElements.forEach((elem) => {
    const activityScope: ActivityScope = locallyActivityTypes.includes(elem.activity.activityType) ? 'Locally' : 'Globally'

    if (activityScope === 'Globally') {
      return
    }

    const dateString = new DateHandler(elem.from).format('YYYY-MM-DD')

    if (!travelElements[dateString]) {
      travelElements[dateString] = {
        passed: 0,
        count: 0,
      }
    }

    travelElements[dateString].passed += elem.passed ? 1 : 0
    travelElements[dateString].count += 1
  })

  const dates = Object.keys(travelElements).sort((a, b) => DateHandler.compareDates(b, a))

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell> {t('day')} </TableCell>
            <TableCell> {t('activities_end')} </TableCell>
            <TableCell> {t('browse')} </TableCell>
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
                    {t('browse')}
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
