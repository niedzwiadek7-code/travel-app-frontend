import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
  alpha,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from '../../../../../app/hooks'
import { RootState } from '../../../../../app/store'

const AccommodationTable: React.FC = () => {
  const accommodations = useAppSelector((state: RootState) => state.travelRecipe.accommodations)
  const { t } = useTranslation('translation', { keyPrefix: 'travel_recipes_get_page' })
  const theme = useTheme()

  const formatter = Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'PLN',
  })

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
            <TableCell>
              <Typography variant="subtitle2">
                {t('name')}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2">
                {t('place')}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2">
                {t('days_range')}
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
          {accommodations.map((accommodationElement) => (
            <TableRow key={accommodationElement.id}>
              <TableCell>
                <Typography variant="body1">
                  {accommodationElement.activity.name}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1">
                  {accommodationElement.activity.place}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1">
                  {accommodationElement.from} - {accommodationElement.to}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1" fontWeight={500}>
                  {formatter.format(accommodationElement.price)}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default AccommodationTable
