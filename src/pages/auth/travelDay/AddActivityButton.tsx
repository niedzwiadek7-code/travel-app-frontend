import React from 'react'
import { Button, Menu, MenuItem } from '@mui/material'
import { Pages } from '../../pages'
import { locallyActivityTypes } from '../../../model'
import { useRouter } from '../../../hooks'

type Props = {
  countDay: string
}

const AddActivityButton: React.FC<Props> = (props) => {
  const {
    navigate,
    pathname,
  } = useRouter()

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
              previousPage: pathname,
              availableTypes: ['Attraction', 'Trip', 'Restaurant'],
              travelRecipe: true,
              countDay: props.countDay,
            },
          })}
        >
          Stwórz i dodaj nową aktywność
        </MenuItem>
        <MenuItem
          onClick={() => navigate(Pages.LIST_ACTIVITY.getRedirectLink(), {
            state: {
              previousPage: pathname,
              types: locallyActivityTypes,
              travelRecipe: true,
              countDay: props.countDay,
              source: 'system',
            },
          })}
        >
          Wybierz z dostepnych aktywności
        </MenuItem>
        <MenuItem
          onClick={() => navigate(Pages.LIST_ACTIVITY.getRedirectLink(), {
            state: {
              previousPage: pathname,
              types: locallyActivityTypes,
              travelRecipe: true,
              countDay: props.countDay,
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
