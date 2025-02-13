import React from 'react'
import { IconButton, Tooltip } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { AddCircle } from '@mui/icons-material'
import { Pages } from '../../pages'
import { locallyActivityTypes } from '../../../model'
import { useRouter } from '../../../hooks'
import * as SplitButton from '../../../components/UI/SplitButton'

type Props = {
  travelInstanceId: string
  date: string
}

const AddActivityButton: React.FC<Props> = (props) => {
  const {
    navigate,
    pathname,
  } = useRouter()
  const { t } = useTranslation('translation', { keyPrefix: 'taking_trip_day_page' })

  return (
    <div>
      <SplitButton.Component
        button={(
          <Tooltip title={t('add_button')}>
            <IconButton
              color="success"
            >
              <AddCircle
                fontSize="large"
              />
            </IconButton>
          </Tooltip>
        )}
        options={[
          {
            name: t('add_activity'),
            action: () => navigate(Pages.ACTIVITY_CREATE.getRedirectLink(), {
              state: {
                previousPage: pathname,
                travelInstance: props.travelInstanceId,
                date: props.date,
                availableTypes: locallyActivityTypes,
              },
            }),
          },
          {
            name: t('pick_activity'),
            action: () => navigate(Pages.LIST_ACTIVITY.getRedirectLink(), {
              state: {
                previousPage: pathname,
                types: locallyActivityTypes,
                travelInstance: props.travelInstanceId,
                date: props.date,
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
                travelInstance: props.travelInstanceId,
                date: props.date,
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
