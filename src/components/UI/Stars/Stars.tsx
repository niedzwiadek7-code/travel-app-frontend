import React from 'react'
import {
  Rating as MuiRating, Stack, Typography, useTheme,
} from '@mui/material'
import { useTranslation } from 'react-i18next'

type Props = {
  value: number
  count?: number
  size: 'small' | 'medium' | 'large'
}

const Stars: React.FC<Props> = ({ value, count, size }) => {
  const theme = useTheme()
  const { t } = useTranslation('translation', { keyPrefix: 'stars' })

  return (
    <Stack
      direction="row"
      spacing={1}
      alignItems="center"
    >
      <MuiRating
        value={value || 0}
        precision={0.1}
        readOnly
        size={size}
        sx={{ color: theme.palette.warning.main }}
      />
      <Typography variant="body2" color="text.secondary">
        {count !== undefined && (count === 0
          ? t('no_ratings')
          : `${value.toFixed(1) || 0} (${count} ${t('ratings')})`)}
      </Typography>
    </Stack>
  )
}

export default Stars
