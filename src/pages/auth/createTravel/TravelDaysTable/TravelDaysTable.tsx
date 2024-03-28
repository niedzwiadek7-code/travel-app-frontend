import React, { useEffect, useState } from 'react'
import {
  Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { Visibility, Delete } from '@mui/icons-material'
import { useAppDispatch, useAppSelector } from '../../../../app/hooks'
import { RootState } from '../../../../app/store'
import { addCountDays, deleteDayFromTravel } from '../../../../features/travelRecipe/travelRecipeSlice'
import { Pages } from '../../../pages'
import { DateHandler } from '../../../../utils/Date'

type TravelDay = {
  countDay: number
  countOfActivities: number
  timeToManage: string
}

const TravelDaysTable: React.FC = () => {
  const travelRecipe = useAppSelector((state: RootState) => state.travelRecipe)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(true)
  const [sortedTravelElements, setSortedTravelElements] = useState<TravelDay[]>([])

  const deleteDay = (dayNumber: number) => {
    dispatch(deleteDayFromTravel(dayNumber))
    dispatch(addCountDays(-1))
  }

  useEffect(() => {
    const sortTravelElementsFn = () => {
      const sorted: TravelDay[] = []
      const { travelElements } = travelRecipe

      for (let i = 1; i <= travelRecipe.countDays; i += 1) {
        const travelElementsOnThisDay = travelElements.filter((elem) => elem.dayCount === i)
        const countOfActivities = travelElementsOnThisDay.length

        const freeMinutes = 24 * 60 - travelElementsOnThisDay.reduce(
          (acc, elem) => acc + DateHandler.diff(elem.to, elem.from, 'minutes'),
          0,
        )

        const timeToManage = `${Math.floor(freeMinutes / 60)}h ${freeMinutes % 60}min`

        sorted.push({
          countDay: i,
          countOfActivities,
          timeToManage,
        })
      }

      setSortedTravelElements(sorted)
    }

    setLoading(true)
    sortTravelElementsFn()
    setLoading(false)
  }, [travelRecipe])

  if (loading) {
    return (
      <div> Trwa pobieranie danych </div>
    )
  }

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell> Dzień wyjazdu </TableCell>
            <TableCell> Ilość aktywności </TableCell>
            <TableCell> Czas do zaplanowania </TableCell>
            <TableCell align="right"> Akcje </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {
            sortedTravelElements.map((elem) => (
              <TableRow key={elem.countDay}>
                <TableCell> Dzień {elem.countDay} </TableCell>
                <TableCell> {elem.countOfActivities} </TableCell>
                <TableCell> {elem.timeToManage} </TableCell>
                <TableCell align="right">
                  <Stack
                    gap={1}
                    direction="row"
                    alignItems="center"
                    justifyContent="flex-end"
                  >
                    <Visibility
                      color="primary"
                      onClick={() => {
                        navigate(Pages.TRAVEL_DAY.getRedirectLink({
                          countDay: elem.countDay.toString(),
                        }))
                      }}
                      sx={{
                        cursor: 'pointer',
                      }}
                    />

                    {
                      sortedTravelElements.length === elem.countDay && (
                        <Delete
                          color="error"
                          onClick={() => deleteDay(elem.countDay)}
                          sx={{
                            cursor: 'pointer',
                          }}
                        />
                      )
                    }
                  </Stack>
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  )
}
export default TravelDaysTable
