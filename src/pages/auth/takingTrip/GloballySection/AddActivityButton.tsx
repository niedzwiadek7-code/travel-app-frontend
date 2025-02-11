import React from 'react'
import { Button, IconButton, Tooltip } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { AddCircle, Visibility } from '@mui/icons-material'
import { Pages } from '../../../pages'
import { RootState } from '../../../../app/store'
import { useAppSelector } from '../../../../app/hooks'
import { ActivityType } from '../../../../model'
import { useRouter } from '../../../../hooks'
import * as SplitButton from '../../../../components/UI/SplitButton'

type Props = {
  activityType: ActivityType
}

const AddActivityButton: React.FC<Props> = (props) => {
  const {
    navigate,
    pathname,
  } = useRouter()

  const travelInstance = useAppSelector((state: RootState) => state.travelInstance)
  const { t } = useTranslation('translation', { keyPrefix: 'taking_trip_page' })

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
            name: t('add_accommodation'),
            action: () => navigate(Pages.ACTIVITY_CREATE.getRedirectLink(), {
              state: {
                previousPage: pathname,
                travelInstance: travelInstance.id,
                availableTypes: [props.activityType],
              },
            }),
          },
          {
            name: t('pick_accommodation'),
            action: () => navigate(Pages.LIST_ACTIVITY.getRedirectLink(), {
              state: {
                previousPage: pathname,
                types: [props.activityType],
                travelInstance: travelInstance.id,
                source: 'system',
              },
            }),
          },
          {
            name: t('pick_your_accommodation'),
            action: () => navigate(Pages.LIST_ACTIVITY.getRedirectLink(), {
              state: {
                previousPage: pathname,
                types: [props.activityType],
                travelInstance: travelInstance.id,
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
