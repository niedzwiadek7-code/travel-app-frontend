/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */

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

const InputsMap: Record<ActivityType, InputDefinition[]> = {
  Restaurant: [
    {
      name: InputName.name,
      label: 'Nazwa',
      type: InputType.text,
    },
    {
      name: InputName.description,
      label: 'Opis',
      type: InputType.text,
      rows: Infinity,
    },
    {
      name: InputName.place,
      label: 'Miejsce',
      type: InputType.text,
    },
  ],
  Attraction: [
    {
      name: InputName.name,
      label: 'Nazwa',
      type: InputType.text,
    },
    {
      name: InputName.description,
      label: 'Opis',
      type: InputType.text,
      rows: Infinity,
    },
    {
      name: InputName.place,
      label: 'Miejsce',
      type: InputType.text,
    },
    {
      name: InputName.price,
      label: 'Cena (w zł)',
      type: InputType.price,
    },
    {
      name: InputName.priceType,
      label: 'Rodzaj płatności',
      type: InputType.select,
      options: {
        per_entry: 'Za wejście',
        per_hour: 'Za godzinę',
      },
    },
  ],
  Trip: [
    {
      name: InputName.name,
      label: 'Nazwa',
      type: InputType.text,
    },
    {
      name: InputName.description,
      label: 'Opis',
      type: InputType.text,
      rows: Infinity,
    },
    {
      name: InputName.from,
      label: 'Punkt startowy',
      type: InputType.text,
    },
    {
      name: InputName.to,
      label: 'Punkt końcowy',
      type: InputType.text,
    },
    {
      name: InputName.price,
      label: 'Cena (w zł)',
      type: InputType.price,
    },
  ],
  Accommodation: [
    {
      name: InputName.name,
      label: 'Nazwa',
      type: InputType.text,
    },
    {
      name: InputName.description,
      label: 'Opis',
      type: InputType.text,
      rows: Infinity,
    },
    {
      name: InputName.place,
      label: 'Miejsce',
      type: InputType.text,
    },
    {
      name: InputName.price,
      label: 'Cena (w zł)',
      type: InputType.price,
    },
  ],
}

export default InputsMap
