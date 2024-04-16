import React from 'react'
import { Button } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Pages } from '../../pages'
import { locallyActivityTypes } from '../../../model'
import { useRouter } from '../../../hooks'
import * as SplitButton from '../../../components/UI/SplitButton'

type Props = {
  countDay: string
}

const AddActivityButton: React.FC<Props> = (props) => {
  const {
    navigate,
    pathname,
  } = useRouter()
  const { t } = useTranslation('translation', { keyPrefix: 'travel_day_page' })

  return (
    <div>
      <SplitButton.Component
        button={(
          <Button
            variant="contained"
            color="success"
            style={{ width: '100%' }}
          >
            {t('add_button')}
          </Button>
        )}
        options={[
          {
            name: t('add_activity'),
            action: () => navigate(Pages.ACTIVITY_CREATE.getRedirectLink(), {
              state: {
                previousPage: pathname,
                availableTypes: ['Attraction', 'Trip', 'Restaurant'],
                travelRecipe: true,
                countDay: props.countDay,
              },
            }),
          },
          {
            name: t('pick_activity'),
            action: () => navigate(Pages.LIST_ACTIVITY.getRedirectLink(), {
              state: {
                previousPage: pathname,
                types: locallyActivityTypes,
                travelRecipe: true,
                countDay: props.countDay,
                source: 'system',
              },
            }),
          },
          {
            name: t('pick_your_activity'),
            action: () => navigate(Pages.LIST_ACTIVITY.getRedirectLink(), {
              state: {
                previousPage: pathname,
                types: locallyActivityTypes,
                travelRecipe: true,
                countDay: props.countDay,
                source: 'user',
              },
            }),
          },
        ]}
      />
    </div>
  )
}

export default AddActivityButton
