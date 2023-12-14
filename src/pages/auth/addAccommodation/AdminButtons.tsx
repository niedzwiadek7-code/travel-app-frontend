import React from 'react'
import { Button, Stack } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { Pages } from '../../pages'

type Props = {
  acceptElement: () => {},
  deleteElement: () => {}
  accommodationId: string
}

const AdminButtons: React.FC<Props> = (props) => {
  const navigate = useNavigate()

  return (
    <Stack
      direction="row"
      gap={1}
      justifyContent="flex-end"
    >
      <Button
        type="button"
        variant="contained"
        color="success"
        onClick={props.acceptElement}
      >
        Zaakceptuj
      </Button>

      <Button
        type="button"
        variant="contained"
        color="primary"
        onClick={() => navigate(Pages.ACCOMMODATION_EDIT.getRedirectLink({
          id: props.accommodationId,
        }), {
          state: {
            admin: true,
          },
        })}
      >
        Edytuj
      </Button>

      <Button
        type="button"
        variant="contained"
        color="error"
        onClick={props.deleteElement}
      >
        Usuń
      </Button>
    </Stack>
  )
}

export default AdminButtons
