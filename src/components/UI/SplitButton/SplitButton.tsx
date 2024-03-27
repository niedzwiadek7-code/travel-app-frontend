import React, { ReactNode, useState } from 'react'
import {
  Button, Menu, MenuItem, Stack,
} from '@mui/material'
import { Option } from '.'

type Props = {
  button: ReactNode,
  options?: Option[] | [],
}

const SplitButton: React.FC<Props> = (props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Stack>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        style={{ width: '100%' }}
        onClick={handleClick}
      >
        {props.button}
      </Button>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {props.options?.map((option) => (
          <MenuItem
            key={option.name}
            onClick={option.action}
          >
            {option.name}
          </MenuItem>
        ))}
      </Menu>
    </Stack>
  )
}

export default SplitButton
