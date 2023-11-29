import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import {
  FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent,
} from '@mui/material'
import { Variant } from './Variant'

type Props = {
  variant: Variant
  label: string
  options: Record<(string | number), (string | number)>
  errorMessage?: (string | undefined)
  default?: (string | number)

  name: string
  register: any
  // eslint-disable-next-line no-unused-vars
  onChange?: (e: any) => void
}

const SelectComponent: React.FC<Props> = (props) => {
  const id = uuidv4()
  const [value, setValue] = useState<string>(props.default as string)

  const onChange = (event: SelectChangeEvent) => {
    setValue(event.target.value)
    if (props.onChange) {
      props.onChange(event.target.value)
    }
  }

  return (
    <FormControl
      variant={props.variant}
      fullWidth
      error={Boolean(props.errorMessage)}
    >
      <InputLabel id={id}> {props.label} </InputLabel>
      <Select
        labelId={id}
        id={`Select-${id}`}
        value={value}
        label={props.label}
        onChange={onChange}
        {...props.register(props.name, {
          onChange,
        })}
      >
        {Object.entries(props.options).map(([keyOpt, valueOpt]) => (
          <MenuItem
            key={valueOpt}
            value={keyOpt}
          >
            {valueOpt}
          </MenuItem>
        ))}
      </Select>
      {
        props.errorMessage && (
          <FormHelperText> {props.errorMessage} </FormHelperText>
        )
      }
    </FormControl>
  )
}

SelectComponent.defaultProps = {
  errorMessage: undefined,
  default: '',
  onChange: () => {},
}

export default SelectComponent
