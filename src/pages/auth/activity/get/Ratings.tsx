import React from 'react'
import {
  Avatar, Box, Divider, Paper, Stack, Typography,
} from '@mui/material'
import { Reviews } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import { Rating } from '../../../../model/Activity'
import * as Slider from '../../../../components/UI/Slider'
import * as Stars from '../../../../components/UI/Stars'

type Props = {
  ratings: Rating[]
  count: number
}

const Ratings: React.FC<Props> = ({
  ratings,
  count,
}) => {
  const { t } = useTranslation('translation', { keyPrefix: 'activity_get' })

  return (
    <Paper sx={{ p: 3, borderRadius: 3 }}>
      <Stack spacing={3}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack
            display="flex"
            alignItems="center"
            flexDirection="row"
            gap={2}
          >
            <Reviews
              color="primary"
            />
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              {t('ratings')} ({count})
            </Typography>
          </Stack>
          <Divider />
          {/* <Button */}
          {/*  variant="contained" */}
          {/*  startIcon={<Comment />} */}
          {/*  onClick={handleAddReview} */}
          {/* > */}
          {/*  {t('add_review')} */}
          {/* </Button> */}
        </Stack>
        <Divider />

        {ratings.map((rating) => (
          <Paper
            key={rating.createdAt.toString()}
            sx={{
              p: 3,
              mb: 2,
              borderRadius: 2,
              boxShadow: (theme) => theme.shadows[1],
              position: 'relative',
            }}
          >
            <Stack spacing={2}>
              {/* User Info */}
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar
                  sx={{ width: 48, height: 48 }}
                >
                  {rating.author?.firstName?.[0]}
                </Avatar>
                <Stack>
                  <Typography variant="subtitle1" fontWeight={500}>
                    {rating.author?.firstName} {rating.author?.lastName}
                  </Typography>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography variant="caption" color="text.secondary">
                      {new Date(rating.createdAt).toLocaleDateString()}
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>

              <Stars.Component
                value={rating.rating}
                size="small"
              />

              <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                {rating.text}
              </Typography>

              {rating.photos && rating.photos.length > 0 && (
                <Stack spacing={1}>
                  <Typography variant="caption" color="text.secondary">
                    {t('photos')} ({rating.photos.length})
                  </Typography>
                  <Stack
                    direction="row"
                    spacing={1}
                    rowGap={1}
                    flexWrap="wrap"
                  >
                    {rating.photos.slice(0, 5).map((photo, index) => (
                      <Slider.Component
                        key={photo}
                        buttonComponent={(
                          <Box
                            key={photo}
                            sx={{
                              position: 'relative',
                              flexShrink: 0,
                              borderRadius: 1,
                              overflow: 'hidden',
                              width: 100,
                              height: 100,
                              cursor: 'pointer',
                            }}
                          >
                            <img
                              src={photo}
                              alt={`Review ${index + 1}`}
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                              }}
                            />
                            {index === 4 && rating.photos.length > 5 && (
                              <Box
                                sx={{
                                  position: 'absolute',
                                  top: 0,
                                  left: 0,
                                  right: 0,
                                  bottom: 0,
                                  bgcolor: 'rgba(0,0,0,0.5)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}
                              >
                                <Typography variant="body1" color="white !important">
                                  +{rating.photos.length - 5}
                                </Typography>
                              </Box>
                            )}
                          </Box>
                        )}
                        images={rating.photos}
                        startIndex={index}
                      />
                    ))}
                  </Stack>
                </Stack>
              )}
            </Stack>
          </Paper>
        ))}
      </Stack>
    </Paper>
  )
}

export default Ratings
