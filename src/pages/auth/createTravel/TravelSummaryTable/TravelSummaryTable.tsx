import {
  alpha,
  Stack,
  Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, useTheme,
} from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from '../../../../app/hooks'
import { RootState } from '../../../../app/store'
import { DateHandler } from '../../../../utils/Date'
import { ActivityType, getActivityTypeIcon } from '../../../../model'

const TravelSummaryTable: React.FC = () => {
  const formatter = Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'PLN',
  })

  const travelElements = useAppSelector((state: RootState) => state.travelRecipe.travelElements)
  const accommodations = useAppSelector((state: RootState) => state.travelRecipe.accommodations)
  const { t: tGlob } = useTranslation('translation')
  const { t } = useTranslation('translation', { keyPrefix: 'travel_page.summary_table' })
  const theme = useTheme()

  const activityTypes: Record<ActivityType, string> = {
    Restaurant: tGlob('categories.Restaurant'),
    Trip: tGlob('categories.Trip'),
    Accommodation: tGlob('categories.Accommodation'),
    Attraction: tGlob('categories.Attraction'),
  }

  const getTime = (activityType?: ActivityType) => {
    if (activityType === 'Accommodation') {
      return t('not_applicable')
    }

    const elements = activityType
      ? travelElements.filter((elem) => elem.activity.activityType === activityType)
      : travelElements

    const minutesSum = elements.reduce(
      (acc, value) => acc + DateHandler.diff(value.to, value.from, 'minutes'),
      0,
    )

    const hours = Math.floor(minutesSum / 60)
    const minutes = minutesSum % 60

    return `${hours}h ${minutes}min`
  }

  const getPrice = (activityType?: ActivityType) => {
    if (activityType === 'Accommodation') {
      const price = accommodations.reduce(
        (acc, value) => acc + value.price,
        0,
      )
      return formatter.format(price)
    }

    const elements = activityType
      ? travelElements.filter((elem) => elem.activity.activityType === activityType)
      : travelElements

    const price = elements.reduce(
      (acc, value) => acc + value.price,
      0,
    )

    if (!activityType) {
      const accommodationsPrice = accommodations.reduce(
        (acc, value) => acc + value.price,
        0,
      )

      return formatter.format(price + accommodationsPrice)
    }

    return formatter.format(price)
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
            <TableCell> {t('category')} </TableCell>
            <TableCell> {t('time')} </TableCell>
            <TableCell> {t('cost')} </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {Object.entries(activityTypes).map(([typeString, name]) => {
            const type = typeString as ActivityType
            const Icon = getActivityTypeIcon(type)
            return (
              <TableRow key={type}>
                <TableCell>
                  <Stack
                    direction="row"
                    alignItems="center"
                    gap={1}
                  >
                    <Icon
                      fontSize="small"
                      color="primary"
                    />
                    {name}
                  </Stack>
                </TableCell>
                <TableCell> { getTime(type) } </TableCell>
                <TableCell> { getPrice(type) } </TableCell>
              </TableRow>
            )
          })}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableCell> {t('sum')} </TableCell>
            <TableCell> { getTime() } </TableCell>
            <TableCell> { getPrice() } </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  )
}

export default TravelSummaryTable
