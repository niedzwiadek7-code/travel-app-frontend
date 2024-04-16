import React from 'react'
import { Button } from '@mui/material'
import { useTranslation } from 'react-i18next'
import * as SaveActivityModal from '../../../../components/SaveActivityModal'
import { ExtendedActivityFormat } from '../../../../services/backend/Activity/types'

type Props = {
  activity: ExtendedActivityFormat,
  countDay: string
}

const SaveActivityModalComponent: React.FC<Props> = (props) => {
  const { t } = useTranslation('translation', { keyPrefix: 'activity_page.add_to_trip' })

  return (
    <SaveActivityModal.Component
      button={(
        <Button
          type="button"
          variant="contained"
          sx={{ width: '100%' }}
        >
          {t('button')}
        </Button>
      )}
      activity={props.activity}
      countDay={props.countDay}
    />
  )
}

export default SaveActivityModalComponent
