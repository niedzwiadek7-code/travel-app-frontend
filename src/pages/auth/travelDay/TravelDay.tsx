import React from 'react'
import {
  Stack, Table, TableCell, TableContainer, TableHead, TableRow, TableBody, Button,
} from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../../app/hooks'
import { RootState } from '../../../app/store'
import { Pages } from '../../../pages/pages'
import { deleteActivityFromTravel } from '../../../features/travelRecipe/travelRecipeSlice'

const TravelDay: React.FC = () => {
  const { countDay } = useParams()
  const navigate = useNavigate()
  const travelElements = useAppSelector((state: RootState) => state.travelRecipe.travelElements)
  const dispatch = useAppDispatch()

  const travelElementsThisDay = travelElements.filter((e) => e.dayCount === parseInt(countDay || '', 10))

  const deleteActivity = (id: string) => {
    dispatch(deleteActivityFromTravel(id))
  }

  if (!countDay) {
    return (
      <div>
        Wystąpił nieoczikwany problem
      </div>
    )
  }

  return (
    <Stack>
      <h2>
        Dzień {countDay}
      </h2>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell> Ramy czasowe </TableCell>
              <TableCell> Aktywność </TableCell>
              <TableCell> Miejsce </TableCell>
              <TableCell> Cena </TableCell>
              <TableCell> Akcja </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {travelElementsThisDay.map((elem) => (
              <TableRow key={`${elem.from}-${elem.to}`}>
                <TableCell />
                <TableCell> {elem.from.toString()} - {elem.to.toString()} </TableCell>
                <TableCell> {elem.activity.name} </TableCell>
                <TableCell>
                  { elem.activity.customParameters.place
                    ? elem.activity.customParameters.place
                    : `${elem.activity.customParameters.from} - ${elem.activity.customParameters.to}`}
                </TableCell>
                <TableCell> Do zaimplementowania </TableCell>
                <TableCell>
                  <Stack>
                    <Button
                      type="button"
                      variant="contained"
                      color="error"
                      onClick={() => deleteActivity(elem.id)}
                    >
                      Odwołaj
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Stack
        direction="row"
        justifyContent="flex-end"
        gap={1}
        style={{ marginTop: '1em' }}
      >
        <Button
          type="button"
          variant="outlined"
          onClick={() => navigate(Pages.CREATE_TRAVEL.getRedirectLink())}
        >
          Powrót
        </Button>

        <Button
          type="button"
          variant="contained"
          onClick={() => navigate(Pages.ADD_ACTIVITY.getRedirectLink({
            countDay,
          }))}
        >
          Dodaj aktywność
        </Button>
      </Stack>
    </Stack>
  )
}

export default TravelDay
