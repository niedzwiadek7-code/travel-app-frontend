import React from 'react'
import { Button, Menu, MenuItem } from '@mui/material'
import {
  Menu as MenuIcon,
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { Pages } from '../../../pages'

type Props = {
  travelRecipeId: string
}

const MenuComponent: React.FC<Props> = (props) => {
  const navigate = useNavigate()
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
        <MenuItem
          onClick={() => navigate(Pages.EDIT_TRAVEL.getRedirectLink({
            id: props.travelRecipeId,
          }))}
        >
          Edytuj plan
        </MenuItem>
        <MenuItem onClick={handleClose}>Usuń plan</MenuItem>
      </Menu>
    </div>
  )
}

export default MenuComponent
