import React from 'react'
import {
  Card, CardContent, CardCover, Typography,
} from '@mui/joy'
import { Box, useTheme } from '@mui/material'

type Props = {
  image: string,
  title: string,
  description: string,
  onClick?: () => void,
}

const CardComponent: React.FC<Props> = (props) => {
  const theme = useTheme()

  return (
    <Card
      sx={{
        height: 200,
        flexBasis: 1,
        flexGrow: 1,
        cursor: 'pointer',
      }}
      onClick={props.onClick}
    >
      <CardCover>
        <img
          src={props.image}
          alt=""
        />
      </CardCover>
      <CardContent
        sx={{ justifyContent: 'flex-end' }}
      >
        <Box component="span">
          <Typography
            textColor={theme.palette.primary.contrastText}
            mb={1}
          >
            {props.description}
          </Typography>

          <Typography
            level="h4"
            fontWeight="lg"
            textColor={theme.palette.primary.contrastText}
          >
            {props.title}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

CardComponent.defaultProps = {
  onClick: () => {},
}

export default CardComponent
