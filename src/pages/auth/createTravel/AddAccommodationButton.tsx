import React from 'react'
import { Button, Menu, MenuItem } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { Pages } from '../../../pages/pages'

const AddActivityButton: React.FC = () => {
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
        variant="contained"
        color="success"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        style={{ width: '100%' }}
        onClick={handleClick}
      >
        Dodaj nocleg
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
          onClick={() => navigate(Pages.ACCOMMODATION_CREATE.getRedirectLink(), {
            state: {
              travelRecipe: true,
            },
          })}
        >
          Stwórz i dodaj nowy nocleg
        </MenuItem>
        <MenuItem
          onClick={() => navigate(Pages.ADD_ACCOMMODATION.getRedirectLink(), {
            state: {
              travelRecipe: true,
              source: 'system',
            },
          })}
        >
          Wybierz z dostepnych noclegów
        </MenuItem>
        <MenuItem
          onClick={() => navigate(Pages.ADD_ACCOMMODATION.getRedirectLink(), {
            state: {
              travelRecipe: true,
              source: 'user',
            },
          })}
        >
          Wybierz z stworzonych przez siebie noclegów
        </MenuItem>
      </Menu>
    </div>
  )
}

export default AddActivityButton
