import React from 'react'
import { Button, Menu, MenuItem } from '@mui/material'
import { Pages } from '../../../pages'
import { ActivityType } from '../../../../model'
import { useRouter } from '../../../../hooks'

type Props = {
  activityType: ActivityType
}

const AddActivityButton: React.FC<Props> = (props) => {
  const {
    navigate,
    pathname,
  } = useRouter()

  // TODO: make dropdown menu global component

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
          onClick={() => navigate(Pages.ACTIVITY_CREATE.getRedirectLink(), {
            state: {
              previousPage: pathname,
              travelRecipe: true,
              availableTypes: [props.activityType],
            },
          })}
        >
          Stwórz i dodaj nowy nocleg
        </MenuItem>
        <MenuItem
          onClick={() => navigate(Pages.LIST_ACTIVITY.getRedirectLink(), {
            state: {
              previousPage: pathname,
              types: [props.activityType],
              travelRecipe: true,
              source: 'system',
            },
          })}
        >
          Wybierz z dostepnych noclegów
        </MenuItem>
        <MenuItem
          onClick={() => navigate(Pages.LIST_ACTIVITY.getRedirectLink(), {
            state: {
              previousPage: pathname,
              types: [props.activityType],
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
