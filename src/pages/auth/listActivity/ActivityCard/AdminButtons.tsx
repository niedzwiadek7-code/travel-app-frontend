import React from 'react'
import { Button, Stack } from '@mui/material'
import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation('translation', { keyPrefix: 'activity_list_page.admin_buttons' })

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
        {t('accept')}
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
        {t('edit')}
      </Button>

      <Button
        type="button"
        variant="contained"
        color="error"
        onClick={props.deleteElement}
      >
        {t('delete')}
      </Button>
    </Stack>
  )
}

export default AdminButtons
