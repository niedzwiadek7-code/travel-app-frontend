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
import { Variant } from './Variant'
import { Type } from './Type'

type Props = {
  variant: Variant,
  type: Type,
  label: string,
  icon?: ReactNode,
  data: any,
  // eslint-disable-next-line no-unused-vars
  onChange?: (e: any) => void,
  error?: string,
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

  const errObj: Record<string, any> = {}

  if (props.error) {
    errObj.error = true
    errObj.helperText = props.error
  }

  const InputComp = getInputComponent()
  const uuid = uuidv4()

  return (
    <FormControl
      variant={props.variant}
      error={Boolean(props.error)}
      sx={{ width: '100%' }}
    >
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
        onChange={props.onChange}
        {...props.data}
      />
      {props.error && (
        <FormHelperText id={uuid}>
          { props.error }
        </FormHelperText>
      )}
    </FormControl>
  )
}

InputComponent.defaultProps = {
  icon: <> </>,
  onChange: () => {},
  error: '',
}

export default InputComponent
