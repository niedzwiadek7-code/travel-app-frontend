/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */

import { passwordStrength } from 'check-password-strength'

export const Errors = {
  required: (value: boolean = true) => ({
    required: {
      value,
      message: 'To pole jest wymagane',
    },
  }),
  min: (value: number) => ({
    minLength: {
      value,
      message: 'Wprowadzona wartość jest zbyt krótka',
    },
  }),
  max: (value: number) => ({
    maxLength: {
      value,
      message: 'Wprowadzona wartość jest zbyt długa',
    },
  }),
  pattern: (value: string) => ({
    pattern: {
      value: new RegExp(value),
      message: 'Niepoprawny format pola',
    },
  }),
  password: (value: string) => ({
    validate: {
      password: (value: string) => passwordStrength(value).id > 1 || 'Podane hasło jest zbyt słabe',
      // message: 'Podane hasło jest zbyt słabe',
    },
  }),
  email: (value: string) => ({
    validate: {
      email: (value: string) => String(value)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        ) || 'Podany email jest niepoprawny',
    },
  }),
  minNum: (value: number) => ({
    min: {
      value,
      message: 'Wprowadzona wartość jest zbyt mała',
    },
  }),
  maxNum: (value: number) => ({
    max: {
      value,
      message: 'Wprowadzona wartość jest zbyt duża',
    },
  }),
} as Record<string, any>
