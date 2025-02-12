import React from 'react'
import {
  alpha, Box,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useTheme,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { EventNote } from '@mui/icons-material'
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
  const theme = useTheme()

  if (travelElementsThisDay.length === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          padding: 4,
          borderRadius: '8px',
          backgroundColor: alpha(theme.palette.primary.main, 0.05),
          boxShadow: `0 4px 12px ${alpha(theme.palette.common.black, 0.1)}`,
          textAlign: 'center',
        }}
      >
        <EventNote
          fontSize="large"
          sx={{
            color: theme.palette.primary.main,
          }}
        />
        <Typography variant="h6" color="text.secondary">
          {t('no_activities')}
        </Typography>
      </Box>
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
