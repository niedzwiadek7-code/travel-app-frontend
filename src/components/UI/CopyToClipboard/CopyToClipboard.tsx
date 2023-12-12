import React from 'react'
import { IconButton } from '@mui/material'
import { Share as ShareIcon } from '@mui/icons-material'
import { useDependencies } from '../../../context/dependencies'

type Props = {
  color: string
  text: string
  fontSize: 'large' | 'medium' | 'small'
}

const CopyToClipboard: React.FC<Props> = (props) => {
  const { getToastUtils } = useDependencies()
  const toastUtils = getToastUtils()

  const handleClick = () => {
    navigator.clipboard.writeText(props.text)
    toastUtils.Toast.showToast(
      toastUtils.types.INFO,
      'Link do planu wycieczki zapisano do schowka',
    )
  }

  return (
    <IconButton
      onClick={handleClick}
    >
      <ShareIcon
        fontSize={props.fontSize}
        style={{
          color: props.color,
        }}
      />
    </IconButton>
  )
}

export default CopyToClipboard
