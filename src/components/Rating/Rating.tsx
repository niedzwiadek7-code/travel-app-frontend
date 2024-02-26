import React from 'react'
import {
  Grid, Stack, Typography, useTheme,
} from '@mui/material'
import { User } from '../../model'

type Props = {
  text: string
  photos: string[]
  author: User
}

const Rating: React.FC<Props> = (props) => {
  const theme = useTheme()

  return (
    <Stack
      style={{
        marginTop: '.8em',
        marginBottom: '.8em',
        backgroundColor: theme.palette.grey['50'],
        padding: '.5em',
        borderRadius: '5px',
      }}
      gap={1}
    >
      <h4
        style={{ margin: 0 }}
      >
        { props.author.firstName } { props.author.lastName }
      </h4>

      <Typography>
        { props.text }
      </Typography>

      <Grid
        container
        spacing={2}
      >
        {
          props.photos.map((url) => (
            <Grid
              item
              key={url}
              xs={2}
            >
              <img
                src={`${process.env.REACT}/uploads/${url}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '5px',
                }}
                alt=""
              />
            </Grid>
          ))
        }
      </Grid>
    </Stack>
  )
}

export default Rating
