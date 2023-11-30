/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */

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
  type: InputType
  options?: Record<string, string>
}

export default {
  Restauracja: [
    {
      name: 'name',
      label: 'Nazwa',
      type: 'text',
    },
    {
      name: 'description',
      label: 'Opis',
      type: 'text',
    },
    {
      name: 'place',
      label: 'Miejsce',
      type: 'text',
    },
  ],
  Nocleg: [
    {
      name: 'name',
      label: 'Nazwa',
      type: 'text',
    },
    {
      name: 'description',
      label: 'Opis',
      type: 'text',
    },
    {
      name: 'place',
      label: 'Miejsce',
      type: 'text',
    },
    {
      name: 'price',
      label: 'Cena (w zł)',
      type: 'price',
    },
  ],
  Atrakcja: [
    {
      name: 'name',
      label: 'Nazwa',
      type: 'text',
    },
    {
      name: 'description',
      label: 'Opis',
      type: 'text',
    },
    {
      name: 'place',
      label: 'Miejsce',
      type: 'text',
    },
    {
      name: 'price',
      label: 'Cena (w zł)',
      type: 'price',
    },
    {
      name: 'priceType',
      label: 'Rodzaj płatności',
      type: 'select',
      options: {
        per_entry: 'Za wejście',
        per_hour: 'Za godzinę',
      },
    },
  ],
  Podróż: [
    {
      name: 'name',
      label: 'Nazwa',
      type: 'text',
    },
    {
      name: 'description',
      label: 'Opis',
      type: 'text',
    },
    {
      name: 'from',
      label: 'Punkt startowy',
      type: 'text',
    },
    {
      name: 'to',
      label: 'Punkt końcowy',
      type: 'text',
    },
    {
      name: 'price',
      label: 'Cena (w zł)',
      type: 'price',
    },
  ],
} as Record<string, Array<InputDefinition>>
