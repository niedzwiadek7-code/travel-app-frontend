import React from 'react'
import {
  CalendarMonth, Delete,
  Menu as MenuIcon,
} from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@mui/material'
import * as SplitButton from '../../../../components/UI/SplitButton'

type Props = {
  isWaitingTrip: boolean
  deleteTravelInstance: () => void
}

const MenuComponent: React.FC<Props> = (props) => {
  const { t } = useTranslation('translation', { keyPrefix: 'realized_trips_page.trip_card' })
  const theme = useTheme()

  const options = [
    {
      name: t('delete_trip'),
      action: props.deleteTravelInstance,
      Icon: Delete,
    },
  ]

  if (props.isWaitingTrip) {
    options.unshift({
      name: t('edit_start_date'),
      action: () => {},
      Icon: CalendarMonth,
    })
  }

  return (
    <SplitButton.Component
      button={(
        <MenuIcon
          sx={{
            paddingX: theme.spacing(1),
            paddingTop: theme.spacing(0.75),
          }}
        />
      )}
      options={options}
    />
  )
}

export default MenuComponent
