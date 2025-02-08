import React, {
  cloneElement, ReactElement, ReactNode, useState,
} from 'react'
import { Fade } from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css'
import { Box, Stack } from '@mui/material'
import * as Image from '../Image'
import * as Modal from '../Modal'

type Props = {
  buttonComponent: ReactNode,
  images: string[],
  startIndex?: number,
}

const Slider: React.FC<Props> = (props) => {
  const [open, setOpen] = useState<boolean>(false)
  const showModal = () => setOpen(true)
  const hideModal = () => setOpen(false)

  let photos: string[]

  if (props.startIndex) {
    const beforeStartIndex = props.images.slice(0, props.startIndex)
    const afterStartIndex = props.images.slice(props.startIndex)
    photos = [...afterStartIndex, ...beforeStartIndex]
  } else {
    photos = props.images
  }

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <Modal.Component
        buttonComponent={props.buttonComponent}
        title="Slider"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            maxWidth: '100%',
            maxHeight: '100%',
            overflow: 'hidden',
          }}
        >
          <div
            className="slide-container"
            style={{
              minWidth: '50%',
              minHeight: '50%',
              maxWidth: '100%',
              maxHeight: '100%',
              overflow: 'hidden',
            }}
          >
            <Fade
              autoplay={false}
            >
              {
                photos.map((image) => (
                  <Stack
                    key={image}
                    alignItems="center"
                    justifyContent="center"
                    style={{
                      minWidth: '50%',
                      minHeight: '50%',
                      maxWidth: '100%',
                      maxHeight: '100%',
                    }}
                  >
                    <Image.Component
                      alt=""
                      src={image}
                      style={{
                        minWidth: '50%',
                        minHeight: '50%',
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </Stack>
                ))
              }

            </Fade>
          </div>
        </Box>
      </Modal.Component>
    </div>
  )
}

Slider.defaultProps = {
  startIndex: 0,
}

export default Slider
