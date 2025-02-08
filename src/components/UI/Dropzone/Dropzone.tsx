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
  value: File[],
  // eslint-disable-next-line no-unused-vars
  onChange: (file: File[]) => void
}

const Dropzone: React.FC<Props> = (props) => {
  const theme = useTheme()
  const [isDragging, setIsDragging] = useState(false)
  const [previewImages, setPreviewImages] = useState<string[]>([])
  const { t } = useTranslation('translation', { keyPrefix: 'dropzone' })

  useEffect(() => {
    if (props.value.length) {
      const urls = props.value.map((file) => URL.createObjectURL(file))
      setPreviewImages(urls)
    }

    return () => {
      previewImages.forEach((url) => URL.revokeObjectURL(url))
    }
  }, [])

  const handleRemove = (index: number) => {
    const previewImagesCopy = [...previewImages]
    const newPreviewImages = previewImagesCopy.filter((_, i) => i !== index)
    setPreviewImages(newPreviewImages)

    const newImages = props.value.filter((_, i) => i !== index)
    props.onChange(newImages)
  }

  const addImages = (files: File[]) => {
    setPreviewImages((prev) => {
      files.forEach((file) => {
        prev.push(URL.createObjectURL(file))
      })
      return prev
    })

    const newImages = [
      ...props.value,
      ...files,
    ]

    props.onChange(newImages)
  }

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault()
    event.stopPropagation()
    setIsDragging(false)

    const { files } = event.dataTransfer
    if (files.length) {
      addImages(Array.from(files))
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
      addImages(arrayFiles)
    }
  }

  return (
    <Stack
      gap={2}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        sx={{
          width: '100%',
        }}
      >
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
          <Typography>
            {t('drop_files')}
          </Typography>
        </label>
      </Stack>

      {
        previewImages.length > 0 && (
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
                padding: '.5em',
                margin: 0,
                backgroundColor: theme.palette.grey[200],
              }}
            >
              {
                previewImages.map((url, index) => (
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
                            width: '100%',
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
                ))
              }
            </Grid>

            <Typography
              variant="caption"
              color="textSecondary"
              align="right"
            >
              {t('image_info')}
            </Typography>
          </Stack>
        )
      }
    </Stack>
  )
}

export default Dropzone
