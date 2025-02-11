import React from 'react'
import {
  TableCell,
  TableRow,
  useTheme,
  Typography,
} from '@mui/material'
import {
  AirplanemodeActive,
  Restaurant as RestaurantIcon,
  Attractions as AttractionIcon,
} from '@mui/icons-material'
import { LocallyTravelElement } from '../../../../../model'

type Props = {
  travelElement: LocallyTravelElement;
};

const ActivityRow: React.FC<Props> = ({ travelElement }) => {
  const theme = useTheme()

  const formatter = Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'PLN',
  })

  const getIcon = (activityType: string) => {
    switch (activityType) {
      case 'Trip':
        return <AirplanemodeActive style={{ fill: theme.palette.primary.main }} />
      case 'Restaurant':
        return <RestaurantIcon style={{ fill: theme.palette.primary.main }} />
      case 'Attraction':
        return <AttractionIcon style={{ fill: theme.palette.primary.main }} />
      default:
        return null
    }
  }

  return (
    <TableRow key={`${travelElement.from}-${travelElement.to}`}>
      <TableCell>
        {getIcon(travelElement.activity.activityType)}
      </TableCell>
      <TableCell>
        <Typography variant="body1">
          {travelElement.from.toString()} - {travelElement.to.toString()}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body1">
          {travelElement.activity.name}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body1">
          {travelElement.activity.place
            ? travelElement.activity.place
            : `${travelElement.activity.from} - ${travelElement.activity.to}`}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body1">
          {travelElement.numberOfPeople || '-'}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body1" fontWeight={500}>
          {formatter.format(travelElement.price)}
        </Typography>
      </TableCell>
    </TableRow>
  )
}

export default ActivityRow
