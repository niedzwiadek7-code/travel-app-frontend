import React from 'react'
import { Button, Menu, MenuItem } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { Pages } from '../../../pages/pages'

type Props = {
  travelInstanceId: string
  date: string
}

const AddActivityButton: React.FC<Props> = (props) => {
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
        Dodaj aktywność
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
          onClick={() => navigate(Pages.ACTIVITY_CREATE.getRedirectLink(), {
            state: {
              travelInstance: props.travelInstanceId,
              date: props.date,
            },
          })}
        >
          Stwórz i dodaj nową aktywność
        </MenuItem>
        <MenuItem
          onClick={() => navigate(Pages.LIST_ACTIVITY.getRedirectLink(), {
            state: {
              travelInstance: props.travelInstanceId,
              date: props.date,
              source: 'system',
            },
          })}
        >
          Wybierz z dostepnych aktywności
        </MenuItem>
        <MenuItem
          onClick={() => navigate(Pages.LIST_ACTIVITY.getRedirectLink(), {
            state: {
              travelInstance: props.travelInstanceId,
              date: props.date,
              source: 'user',
            },
          })}
        >
          Wybierz z stworzonych przez siebie aktywności
        </MenuItem>
      </Menu>
    </div>
  )
}

export default AddActivityButton
