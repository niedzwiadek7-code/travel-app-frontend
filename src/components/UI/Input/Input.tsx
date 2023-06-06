import React, { ReactNode } from 'react'
import {
  FilledInput,
  OutlinedInput,
  Input,
  FormControl,
  InputLabel,
  InputAdornment,
} from '@mui/material'
import { v4 as uuidv4 } from 'uuid'
import { Variant } from './Variant'
import { Type } from './Type'

type Props = {
  variant: Variant,
  type: Type,
  label: string,
  icon?: ReactNode
}

const InputComponent: React.FC<Props> = (props) => {
  const getInputComponent = () => {
    switch (props.variant) {
      case Variant.OUTLINED:
        return OutlinedInput
      case Variant.FILLED:
        return FilledInput
      default:
        return Input
    }
  }

  const InputComp = getInputComponent()
  const uuid = uuidv4()

  return (
    <FormControl variant={props.variant} sx={{ width: '100%' }}>
      <InputLabel htmlFor={uuid}>
        { props.label }
      </InputLabel>
      <InputComp
        id={uuid}
        type={props.type}
        startAdornment={(
          <InputAdornment position="start">
            {props.icon}
          </InputAdornment>
        )}
        label={props.label}
      />
    </FormControl>
  )
}

InputComponent.defaultProps = {
  icon: <> </>,
}

export default InputComponent
