import React, {
  cloneElement, ReactElement, ReactNode, useState,
} from 'react'
import {
  Box, IconButton, Modal, Stack, Typography,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { Action } from '.'
import ButtonComponent from './Button'

type Props = {
  buttonComponent: ReactNode,
  title: string,
  children: ReactNode,
  actions?: Action[]
}

const ModalComponent: React.FC<Props> = (props) => {
  const [open, setOpen] = useState<boolean>(false)
  const showModal = () => setOpen(true)
  const hideModal = () => setOpen(false)

  return (
    <div>
      {cloneElement(props.buttonComponent as ReactElement, { onClick: showModal })}
      <Modal
        open={open}
        onClose={hideModal}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <IconButton
            onClick={hideModal}
            sx={{
              position: 'absolute',
              top: 5,
              right: 5,
            }}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>

          <Typography variant="h6" component="h2">
            {props.title}
          </Typography>

          <Stack sx={{ marginTop: '.8em' }}>
            {props.children}
          </Stack>

          {
            props.actions?.length && props.actions?.length > 0 && (
              <Stack
                justifyContent="flex-end"
                gap={1}
                sx={{
                  marginTop: '1.2em',
                  flexDirection: {
                    xs: 'column',
                    sm: 'row',
                  },
                }}
              >
                {props.actions && props.actions.map((action) => (
                  <ButtonComponent
                    key={action.name}
                    action={action}
                    hideModal={hideModal}
                  />
                ))}
              </Stack>
            )
          }
        </Box>
      </Modal>
    </div>
  )
}

ModalComponent.defaultProps = {
  actions: [],
}

export default ModalComponent
