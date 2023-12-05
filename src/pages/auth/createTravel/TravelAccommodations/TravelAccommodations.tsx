import React from 'react'
import {
  Button,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from '@mui/material'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../../../app/hooks'
import { RootState } from '../../../../app/store'
import { deleteAccommodationFromTravel } from '../../../../features/travelRecipe/travelRecipeSlice'

const TravelAccommodations: React.FC = () => {
  const accommodations = useAppSelector((state: RootState) => state.travelRecipe.accommodations)
  const dispatch = useDispatch()

  const formatter = Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'PLN',
  })

  const deleteAccommodation = (id: string) => {
    dispatch(deleteAccommodationFromTravel(id))
  }

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell> Nazwa </TableCell>
            <TableCell> Miejsce </TableCell>
            <TableCell> Ilość dni </TableCell>
            <TableCell> Cena </TableCell>
            <TableCell> Odwołaj </TableCell>
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
                <TableCell>
                  <Button
                    type="button"
                    variant="contained"
                    color="error"
                    onClick={() => { deleteAccommodation(accommodationElement.id) }}
                  >
                    Odwołaj
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

export default TravelAccommodations
