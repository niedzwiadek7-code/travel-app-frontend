import React from 'react'
import { Button } from '@mui/material'
import * as SaveActivityModal from '../../../../components/SaveActivityModal'
import { ExtendedActivityFormat } from '../../../../services/backend/Activity/types'

type Props = {
  activity: ExtendedActivityFormat,
  countDay: string
}

const SaveActivityModalComponent: React.FC<Props> = (props) => (
  <SaveActivityModal.Component
    button={(
      <Button
        type="button"
        variant="contained"
        sx={{ width: '100%' }}
      >
        Dodaj do wycieczki
      </Button>
    )}
    activity={props.activity}
    countDay={props.countDay}
  />
)

export default SaveActivityModalComponent
