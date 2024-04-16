import React from 'react'
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from '../../../../../app/hooks'
import { RootState } from '../../../../../app/store'
import Travel from './Travel'
import Attraction from './Attraction'
import Restaurant from './Restaurant'
import { DateHandler } from '../../../../../utils/Date'

type Props = {
  countDay: number
}

const TravelDayTable: React.FC<Props> = (props) => {
  const travelElements = useAppSelector((state: RootState) => state.travelRecipe.travelElements)
  const travelElementsThisDay = travelElements.filter(
    (e) => e.dayCount === props.countDay,
  ).sort(
    (a, b) => DateHandler.compareDates(a.from, b.from),
  )
  const { t } = useTranslation('translation', { keyPrefix: 'travel_recipes_get_page' })

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell> {t('time_range')} </TableCell>
            <TableCell> {t('activity')} </TableCell>
            <TableCell> {t('place')} </TableCell>
            <TableCell> {t('people')} </TableCell>
            <TableCell> {t('cost')} </TableCell>
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
