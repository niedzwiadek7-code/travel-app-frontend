import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  alpha, useTheme, Box,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { EventNote } from '@mui/icons-material'
import { useAppSelector } from '../../../../../app/hooks'
import { RootState } from '../../../../../app/store'
import ActivityRow from './ActivityRow'
import { DateHandler } from '../../../../../utils/Date'

type Props = {
  countDay: number;
};

const TravelDayTable: React.FC<Props> = ({ countDay }) => {
  const travelElements = useAppSelector((state: RootState) => state.travelRecipe.travelElements)
  const travelElementsThisDay = travelElements
    .filter((e) => e.dayCount === countDay)
    .sort((a, b) => DateHandler.compareDates(a.from, b.from))
  const { t } = useTranslation('translation', { keyPrefix: 'travel_recipes_get_page' })
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
            <TableCell>
              <Typography variant="subtitle2">
                {t('time_range')}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2">
                {t('activity')}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2">
                {t('place')}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2">
                {t('people')}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2">
                {t('cost')}
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {travelElementsThisDay.map((elem) => (
            <ActivityRow key={`${elem.from}-${elem.to}`} travelElement={elem} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TravelDayTable
