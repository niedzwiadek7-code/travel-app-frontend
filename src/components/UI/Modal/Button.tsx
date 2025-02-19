import React, { useState } from 'react'
import { LoadingButton } from '@mui/lab'
import { Action } from './Action'

type Props = {
  action: Action
  hideModal: () => void
}

const ButtonComponent: React.FC<Props> = (props) => {
  const [loading, setLoading] = useState(false)

  const buttonOnChange = async () => {
    try {
      setLoading(true)
      await props.action.onClick()
      setLoading(false)
      if (props.action.hideAfterClick) {
        props.hideModal()
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <LoadingButton
      variant="contained"
      type={props.action.type || 'button'}
      onClick={buttonOnChange}
      loading={loading}
    >
      {props.action.name}
    </LoadingButton>
  )
}

export default ButtonComponent
