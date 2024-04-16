import React, {
  cloneElement, ReactElement, ReactNode, useState,
} from 'react'
import {
  Menu, MenuItem, Stack,
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
      {
        cloneElement(
          props.button as ReactElement,
          {
            id: 'basic-button',
            ariaControls: open ? 'basic-menu' : undefined,
            ariaHasPopup: 'true',
            ariaExpanded: open ? 'true' : undefined,
            style: {
              cursor: 'pointer',
            },
            onClick: handleClick,
          },
        )
      }

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
