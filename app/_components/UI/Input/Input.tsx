'use client'

import React, { ReactNode } from 'react'
import {
  FilledInput,
  OutlinedInput,
  Input,
  FormControl,
  InputLabel,
  InputAdornment, FormHelperText,
} from '@mui/material'
import { v4 as uuidv4 } from 'uuid'
import { Errors } from './Errors'
import { Variant } from './Variant'
import { Type } from './Type'

type Props = {
  variant: Variant,
  type: Type,
  label: string,
  icon?: ReactNode,

  register?: any,
  name: string,

  default?: (string | number),
  // eslint-disable-next-line no-unused-vars
  onChange?: (e: any) => void,
  error?: string,
  rows?: number,
  // TODO: create better handling for errors
  validation?: string[],
}

export default function InputComponent(props: Props) {
  const getInputComponent = () => {
    switch (props.variant) {
      case 'outlined':
        return OutlinedInput
      case 'filled':
        return FilledInput
      default:
        return Input
    }
  }

  let errObj: Record<string, any> = {};

  (props.validation || []).forEach((err) => {
    const [errName, value] = err.split(':')

    if (Errors[errName]) {
      if (value) {
        errObj = {
          ...errObj,
          ...Errors[errName](value),
        }
      } else {
        errObj = {
          ...errObj,
          ...Errors[errName](),
        }
      }
    }
  })

  const InputComp = getInputComponent()
  const uuid = uuidv4()

  return (
    <FormControl
      variant={props.variant}
      error={Boolean(props.error)}
      sx={{ width: '100%' }}
      onChange={
        (e: React.ChangeEvent<HTMLInputElement>) => props.onChange && props.onChange(e.target.value)
      }
    >
      <InputLabel htmlFor={uuid}>
        { props.label }
      </InputLabel>
      <InputComp
        id={uuid}
        type={props.type}
        multiline={props.rows && props.rows > 1}
        maxRows={props.rows || 1}
        startAdornment={(
          <InputAdornment position="start">
            {props.icon}
          </InputAdornment>
        )}
        defaultValue={props.default}
        label={props.label}
        {...props.register(props.name, {
          valueAsNumber: props.type === 'number',
          onChange: props.onChange,
          ...errObj,
        })}
      />
      {props.error && (
        <FormHelperText id={uuid}>
          { props.error }
        </FormHelperText>
      )}
    </FormControl>
  )
}
