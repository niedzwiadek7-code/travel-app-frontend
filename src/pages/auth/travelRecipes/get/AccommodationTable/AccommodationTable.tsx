import React from 'react'
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from '../../../../../app/hooks'
import { RootState } from '../../../../../app/store'

const AccommodationTable: React.FC = () => {
  const accommodations = useAppSelector((state: RootState) => state.travelRecipe.accommodations)
  const { t } = useTranslation('translation', { keyPrefix: 'travel_recipes_get_page' })

  const formatter = Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'PLN',
  })

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell> {t('name')} </TableCell>
            <TableCell> {t('place')} </TableCell>
            <TableCell> {t('days_range')} </TableCell>
            <TableCell> {t('cost')} </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {
            accommodations.map((accommodationElement) => (
              <TableRow key={accommodationElement.id}>
                <TableCell> {accommodationElement.activity.name} </TableCell>
                <TableCell> {accommodationElement.activity.place} </TableCell>
                <TableCell>
                  {accommodationElement.from} - {accommodationElement.to}
                </TableCell>
                <TableCell> {formatter.format(accommodationElement.price)} </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default AccommodationTable
