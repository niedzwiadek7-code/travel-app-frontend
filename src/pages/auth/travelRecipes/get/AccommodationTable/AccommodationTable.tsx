import React from 'react'
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from '@mui/material'
import { useAppSelector } from '../../../../../app/hooks'
import { RootState } from '../../../../../app/store'

const AccommodationTable: React.FC = () => {
  const accommodations = useAppSelector((state: RootState) => state.travelRecipe.accommodations)

  const formatter = Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'PLN',
  })

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell> Nazwa </TableCell>
            <TableCell> Miejsce </TableCell>
            <TableCell> Ilość dni </TableCell>
            <TableCell> Cena </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {
            accommodations.map((accommodationElement) => (
              <TableRow key={accommodationElement.id}>
                <TableCell> {accommodationElement.accommodation.name} </TableCell>
                <TableCell> {accommodationElement.accommodation.place} </TableCell>
                <TableCell> {accommodationElement.numberOfDays} </TableCell>
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
