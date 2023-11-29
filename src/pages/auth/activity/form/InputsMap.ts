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
} as Record<string, Array<Record<string, any>>>
