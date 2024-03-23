import React from 'react'
import { Button, Stack } from '@mui/material'
import { Pages } from '../../../pages'
import { useRouter } from '../../../../hooks'

type Props = {
  acceptElement: () => {},
  deleteElement: () => {}
  activityId: string
}

const AdminButtons: React.FC<Props> = (props) => {
  const {
    navigate,
    pathname,
  } = useRouter()

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
        onClick={() => navigate(Pages.ACTIVITY_EDIT.getRedirectLink({
          id: props.activityId,
        }), {
          state: {
            previousPage: pathname,
            admin: true,
            source: 'toAccept',
            types: ['Attraction', 'Restaurant', 'Trip'],
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
