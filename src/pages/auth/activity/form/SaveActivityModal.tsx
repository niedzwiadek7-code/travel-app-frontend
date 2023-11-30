import React from 'react'
import { Activity } from '../../../../model'
import * as SaveActivityModal from '../../../../components/SaveActivityModal'

type Props = {
  activity: Activity,
  countDay: string
}

const SaveActivityModalComponent: React.FC<Props> = (props) => (
  <SaveActivityModal.Component
    activity={props.activity}
    countDay={props.countDay}
  />
)

export default SaveActivityModalComponent
