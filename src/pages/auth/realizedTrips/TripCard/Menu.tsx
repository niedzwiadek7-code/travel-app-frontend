import React from 'react'
import { Button, Menu, MenuItem } from '@mui/material'
import {
  Menu as MenuIcon,
} from '@mui/icons-material'

type Props = {
  isWaitingTrip: boolean
  deleteTravelInstance: () => void
}

const MenuComponent: React.FC<Props> = (props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        color="white"
        onClick={handleClick}
      >
        <MenuIcon />
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
        {
          props.isWaitingTrip && (
            <MenuItem
              onClick={handleClose}
            >
              Edytuj datę rozpoczęcia
            </MenuItem>
          )
        }
        <MenuItem onClick={props.deleteTravelInstance}>Usuń wycieczkę</MenuItem>
      </Menu>
    </div>
  )
}

export default MenuComponent
