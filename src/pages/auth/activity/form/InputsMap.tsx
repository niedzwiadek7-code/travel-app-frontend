/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */

import { TFunction } from 'i18next'
import { ActivityType } from '../../../../model/ActivityType'

enum InputName {
  name = 'name',
  description = 'description',
  place = 'place',
  price = 'price',
  priceType = 'priceType',
  from = 'from',
  to = 'to',
  activityType = 'activityType'
}

enum InputType {
  text = 'text',
  price = 'price',
  select = 'select'
}

type InputDefinition = {
  name: InputName,
  label: string
  type: InputType,
  rows?: number,
  options?: Record<string, string>
}

// TODO: resolve types problem
const InputsMap: (t: any)
  => Record<ActivityType, InputDefinition[]> = (t: (value: string) => string) => ({
    Restaurant: [
      {
        name: InputName.name,
        label: t('name'),
        type: InputType.text,
      },
      {
        name: InputName.description,
        label: t('description'),
        type: InputType.text,
        rows: Infinity,
      },
      {
        name: InputName.place,
        label: t('place'),
        type: InputType.text,
      },
    ],
    Attraction: [
      {
        name: InputName.name,
        label: t('name'),
        type: InputType.text,
      },
      {
        name: InputName.description,
        label: t('description'),
        type: InputType.text,
        rows: Infinity,
      },
      {
        name: InputName.place,
        label: t('place'),
        type: InputType.text,
      },
      {
        name: InputName.price,
        label: t('price'),
        type: InputType.price,
      },
      {
        name: InputName.priceType,
        label: t('price_type'),
        type: InputType.select,
        options: {
          per_entry: t('per_entry'),
          per_hour: t('per_hour'),
        },
      },
    ],
    Trip: [
      {
        name: InputName.name,
        label: t('name'),
        type: InputType.text,
      },
      {
        name: InputName.description,
        label: t('description'),
        type: InputType.text,
        rows: Infinity,
      },
      {
        name: InputName.from,
        label: t('from'),
        type: InputType.text,
      },
      {
        name: InputName.to,
        label: t('to'),
        type: InputType.text,
      },
      {
        name: InputName.price,
        label: t('price'),
        type: InputType.price,
      },
    ],
    Accommodation: [
      {
        name: InputName.name,
        label: t('name'),
        type: InputType.text,
      },
      {
        name: InputName.description,
        label: t('description'),
        type: InputType.text,
        rows: Infinity,
      },
      {
        name: InputName.place,
        label: t('place'),
        type: InputType.text,
      },
      {
        name: InputName.price,
        label: t('price'),
        type: InputType.price,
      },
    ],
  })

export default InputsMap
