import React, {
  cloneElement, ReactElement, ReactNode, useState,
} from 'react'
import {
  Box, Button, Modal, Stack, Typography,
} from '@mui/material'
import { Action } from '.'

type Props = {
  buttonComponent: ReactNode,
  title: string,
  content: ReactNode,
  actions?: Action[]
}

const ModalComponent: React.FC<Props> = (props) => {
  const [open, setOpen] = useState<boolean>(false)
  const showModal = () => setOpen(true)
  const hideModal = () => setOpen(false)

  const buttonOnChange = (action: Action) => {
    action.onClick()
    hideModal()
  }

  return (
    <div>
      {cloneElement(props.buttonComponent as ReactElement, { onClick: showModal })}
      <Modal
        open={open}
        onClose={hideModal}
      >
        <Box
          sx={{
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2">
            {props.title}
          </Typography>

          <Stack
            sx={{ marginTop: '.8em' }}
          >
            {props.content}
          </Stack>

          <Stack
            direction="row"
            justifyContent="flex-end"
            gap={1}
            sx={{ marginTop: '1.2em' }}
          >
            {props.actions && props.actions.map((action) => (
              <Button
                key={action.name}
                variant="contained"
                type={action?.type || 'button'}
                onClick={() => buttonOnChange(action)}
              >
                {action.name}
              </Button>
            ))}

            <Button
              variant="outlined"
              onClick={hideModal}
            >
              Powrót
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  )
}

ModalComponent.defaultProps = {
  actions: [],
}

export default ModalComponent
