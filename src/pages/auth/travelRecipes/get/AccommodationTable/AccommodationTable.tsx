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
            <TableCell> Zakres dni </TableCell>
            <TableCell> Cena </TableCell>
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
