import React, { ChangeEvent, useEffect, useState } from 'react'
import {
  Box, Grid, Stack, Typography, useTheme,
} from '@mui/material'
import CollectionsIcon from '@mui/icons-material/Collections'
import TrashIcon from '@mui/icons-material/Delete'
import { useTranslation } from 'react-i18next'
import * as Image from '../Image'

type Props = {
  name: string
  register?: any
  accept?: string
  value: (string | File)[]
  // eslint-disable-next-line no-unused-vars
  onChange?: (file: File[]) => void
  // eslint-disable-next-line no-unused-vars
  onAdd?: (files: File[]) => void
  // eslint-disable-next-line no-unused-vars
  onDelete?: (item: string | File) => void
  label?: string
}

const Dropzone: React.FC<Props> = (props) => {
  const theme = useTheme()
  const [isDragging, setIsDragging] = useState(false)
  const [previewImages, setPreviewImages] = useState<string[]>([])
  const { t } = useTranslation('translation', { keyPrefix: 'dropzone' })
  const objectUrls = React.useRef<string[]>([])

  useEffect(() => {
    // Revoke previous object URLs
    objectUrls.current.forEach((url) => URL.revokeObjectURL(url))
    objectUrls.current = []

    const files = props.value.filter((item): item is File => item instanceof File)
    const newUrls = files.map((file) => URL.createObjectURL(file))
    objectUrls.current = newUrls

    const existingUrls = props.value
      .filter((item): item is string => typeof item === 'string')

    setPreviewImages([...existingUrls, ...newUrls])
  }, [props.value])

  const handleRemove = (index: number) => {
    const item = props.value[index]
    if (props.onDelete) {
      props.onDelete(item)
    }
  }

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault()
    event.stopPropagation()
    setIsDragging(false)

    const { files } = event.dataTransfer
    if (files.length && props.onAdd) {
      props.onAdd(Array.from(files))
    }
  }

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault()
  }

  const handleDragEnter = () => {
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleAddImages = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const arrayFiles = Array.from(e.target.files)
      if (props.onAdd) {
        props.onAdd(arrayFiles)
      }
    }
  }

  return (
    <Stack
      gap={1}
      width="100%"
    >
      {
        props.label && (
          <Typography>
            {props.label}
          </Typography>
        )
      }

      <input
        id={`dropzone-${props.name}`}
        type="file"
        hidden
        multiple
        accept={props.accept}
        {...props.register?.(props.name)}
        onChange={handleAddImages}
      />

      <label
        htmlFor={`dropzone-${props.name}`}
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '.5em',
          height: '100px',
          border: `1px dashed ${isDragging ? theme.palette.primary.main : theme.palette.grey[500]}`,
          borderRadius: '5px',
          cursor: 'pointer',
          color: isDragging ? theme.palette.primary.main : theme.palette.text.primary,
          backgroundColor: isDragging ? theme.palette.action.hover : 'transparent',
          transition: 'background-color 0.3s, border-color 0.3s',
        }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
      >
        <CollectionsIcon fontSize="large" />
        <Typography>{t('drop_files')}</Typography>
      </label>

      {previewImages.length > 0 && (
        <Stack
          gap={0.5}
          sx={{
            width: '100%',
          }}
        >
          <Typography>
            {t('preview')}
          </Typography>

          <Grid
            container
            spacing={1}
            style={{
              minHeight: '100px',
              maxHeight: '220px',
              overflowY: 'scroll',
              scrollbarWidth: 'thin',
              padding: '.5em',
              margin: 0,
              backgroundColor: theme.palette.grey[200],
            }}
          >
            {previewImages.map((url, index) => (
              <Grid
                item
                key={url}
                xs={4}
              >
                <Box
                  sx={{
                    position: 'relative',
                    '&:hover .hover-overlay': {
                      opacity: 1,
                    },
                  }}
                >
                  <Box
                    className="hover-overlay"
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: `${theme.palette.error.main}CD`,
                      opacity: 0,
                      transition: 'opacity 0.3s',
                      borderRadius: '5px',
                      zIndex: 1,
                      cursor: 'pointer',
                    }}
                    onClick={() => handleRemove(index)}
                  >
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                      justifyContent="center"
                      gap={1}
                      sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        color: theme.palette.common.white,
                        // width: '100%',
                        objectFit: 'cover',
                      }}
                    >
                      <TrashIcon
                        fontSize="large"
                      />
                    </Box>
                  </Box>

                  <Image.Component
                    alt=""
                    src={url}
                    style={{
                      width: '100%',
                      height: '100px',
                      objectFit: 'cover',
                      borderRadius: '5px',
                      position: 'relative',
                    }}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>

          <Typography
            variant="caption"
            color="textSecondary"
            align="right"
          >
            {t('image_info')}
          </Typography>
        </Stack>
      )}
    </Stack>
  )
}

export default Dropzone
