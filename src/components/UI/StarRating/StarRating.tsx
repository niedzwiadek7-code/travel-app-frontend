import React from 'react'
import { Rating as MuiRating, Stack, Typography } from '@mui/material'
import { Controller, RegisterOptions } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

type Props = {
  label: string
  control?: any
  name: string
  required?: boolean
  size: 'small' | 'medium' | 'large'
  defaultValue?: number
}

const StarRating: React.FC<Props> = (props) => {
  const rulesObj: RegisterOptions = {}
  const { t } = useTranslation('translation', { keyPrefix: 'star_rating' })

  if (props.required) {
    rulesObj.required = t('required')
  }

  return (
    <Stack>
      <Controller
        name={props.name}
        control={props.control}
        rules={rulesObj}
        defaultValue={props.defaultValue}
        render={({ field, fieldState: { error } }) => (
          <Stack>
            <Stack
              flexDirection="row"
              alignItems="center"
              gap={1}
            >
              <Typography>
                {props.label}
              </Typography>

              <MuiRating
                {...field}
                size={props.size}
                max={5}
                value={Number(field.value)}
                onChange={(_, value) => field.onChange(value)}
              />
            </Stack>

            {error && (
              <Typography variant="caption" color="error">
                {error.message}
              </Typography>
            )}
          </Stack>
        )}
      />
    </Stack>
  )
}

export default StarRating
