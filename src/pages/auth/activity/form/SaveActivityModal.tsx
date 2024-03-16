import React from 'react'
import * as SaveActivityModal from '../../../../components/SaveActivityModal'
import { ExtendedActivityFormat } from '../../../../services/backend/Activity/types'

type Props = {
  activity: ExtendedActivityFormat,
  countDay: string
}

const SaveActivityModalComponent: React.FC<Props> = (props) => (
  <SaveActivityModal.Component
    activity={props.activity}
    countDay={props.countDay}
  />
)

export default SaveActivityModalComponent
