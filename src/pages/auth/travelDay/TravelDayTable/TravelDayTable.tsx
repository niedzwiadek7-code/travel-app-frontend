import React from 'react'
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from '../../../../app/hooks'
import { RootState } from '../../../../app/store'
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
  const { t } = useTranslation('translation', { keyPrefix: 'travel_day_page.activity' })

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell> {t('date_range')} </TableCell>
            <TableCell> {t('activity')} </TableCell>
            <TableCell> {t('place')} </TableCell>
            <TableCell> {t('people')} </TableCell>
            <TableCell> {t('price')} </TableCell>
            <TableCell
              align="right"
            >
              {t('actions')}
            </TableCell>
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
