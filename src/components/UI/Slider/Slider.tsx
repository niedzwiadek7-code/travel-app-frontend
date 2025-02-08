import React, {
  cloneElement, ReactElement, ReactNode, useState,
} from 'react'
import { Fade } from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css'
import {
  Box, IconButton, Modal, Stack, styled, useTheme,
} from '@mui/material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import CloseIcon from '@mui/icons-material/Close'
import PauseIcon from '@mui/icons-material/Pause'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import * as Image from '../Image'

const SlideButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  backgroundColor: theme.palette.background.paper,
  zIndex: 1,
  '&:hover': {
    backgroundColor: theme.palette.grey[200],
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1),
    '& svg': {
      fontSize: '1.5rem',
    },
  },
}))

type Props = {
  buttonComponent: ReactNode
  images: string[]
  startIndex?: number
}

const Slider: React.FC<Props> = (props) => {
  const [open, setOpen] = useState<boolean>(false)
  const [autoPlay, setAutoPlay] = useState<boolean>(false)
  const showModal = () => setOpen(true)
  const hideModal = () => setOpen(false)
  const theme = useTheme()

  return (
    <Stack>
      {cloneElement(props.buttonComponent as ReactElement, { onClick: showModal })}
      <Modal
        open={open}
        onClose={hideModal}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Box
          sx={{
            position: 'relative',
            width: '100vw',
            height: '100vh',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 3,
            boxSizing: 'border-box',
          }}
        >
          <Box
            display="flex"
            alignItems="center"
            gap={1}
            sx={{
              position: 'absolute',
              top: 5,
              right: 5,
              zIndex: 1000,
            }}
          >
            <IconButton
              onClick={() => setAutoPlay(!autoPlay)}
              aria-label="autoPlay"
            >
              {autoPlay ? <PauseIcon /> : <PlayArrowIcon />}
            </IconButton>

            <IconButton
              onClick={hideModal}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <Fade
            autoplay={autoPlay}
            defaultIndex={props.startIndex}
            prevArrow={(
              <SlideButton sx={{ left: 16, color: theme.palette.text.primary }}>
                <ChevronLeftIcon fontSize="large" />
              </SlideButton>
            )}
            nextArrow={(
              <SlideButton sx={{ right: 16, color: theme.palette.text.primary }}>
                <ChevronRightIcon fontSize="large" />
              </SlideButton>
            )}
            transitionDuration={500}
            indicators
          >
            {props.images.map((image) => (
              <Box
                key={image}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 'calc(100vh - 36px)',
                  width: '100%',
                  position: 'relative',
                }}
              >
                <Image.Component
                  alt=""
                  src={image}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain',
                    padding: '24px',
                    filter: 'drop-shadow(0 4px 12px rgba(0,0,0,.15))',
                  }}
                />
              </Box>
            ))}
          </Fade>
        </Box>
      </Modal>
    </Stack>
  )
}

Slider.defaultProps = {
  startIndex: 0,
}

export default Slider
