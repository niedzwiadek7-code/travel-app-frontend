import React, { useEffect, useState } from 'react'
import {
  alpha, IconButton,
  Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, useTheme,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { Visibility, Delete } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '../../../../app/hooks'
import { RootState } from '../../../../app/store'
import { addCountDays, deleteDayFromTravel } from '../../../../features/travelRecipe/travelRecipeSlice'
import { Pages } from '../../../pages'
import { DateHandler } from '../../../../utils/Date'
import * as Loading from '../../../../components/UI/Loading'

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
  const { t } = useTranslation('translation', { keyPrefix: 'travel_page.browse_trip_table' })
  const theme = useTheme()

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
      <Loading.Component />
    )
  }

  return (
    <TableContainer
      sx={{
        borderRadius: '8px',
        boxShadow: `0 4px 12px ${alpha(theme.palette.common.black, 0.1)}`,
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Table>
        <TableHead>
          <TableRow
            sx={{
              fontWeight: 700,
              color: theme.palette.primary.dark,
              backgroundColor: alpha(theme.palette.primary.main, 0.1),
              borderBottom: `2px solid ${theme.palette.primary.main}`,
              textTransform: 'uppercase',
            }}
          >
            <TableCell> {t('trip_day')} </TableCell>
            <TableCell> {t('activities')} </TableCell>
            <TableCell> {t('time')} </TableCell>
            <TableCell align="right"> {t('actions')} </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {
            sortedTravelElements.map((elem) => (
              <TableRow key={elem.countDay}>
                <TableCell> {t('day')} {elem.countDay} </TableCell>
                <TableCell> {elem.countOfActivities} </TableCell>
                <TableCell> {elem.timeToManage} </TableCell>
                <TableCell align="right">
                  <Stack
                    gap={1}
                    direction="row"
                    alignItems="center"
                    justifyContent="flex-end"
                  >
                    <Tooltip title={t('review')}>
                      <IconButton
                        sx={{ bgcolor: `${theme.palette.primary.light}20` }}
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
                      </IconButton>
                    </Tooltip>

                    {
                      sortedTravelElements.length === elem.countDay && (
                        <Tooltip title={t('delete')}>
                          <IconButton
                            sx={{ bgcolor: `${theme.palette.error.light}20` }}
                          >
                            <Delete
                              color="error"
                              onClick={() => deleteDay(elem.countDay)}
                              sx={{
                                cursor: 'pointer',
                              }}
                            />
                          </IconButton>
                        </Tooltip>
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
