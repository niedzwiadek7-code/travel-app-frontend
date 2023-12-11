import React from 'react'
import {
  Card, CardContent, Typography, Stack, Button, CardMedia,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Styles from './Cards.module.scss'
import { Pages } from '../../../pages'

type CardProps = {
  title: string,
  description: string,
  link: string,
}

const CardComponent: React.FC<CardProps> = (props) => {
  const navigate = useNavigate()

  return (
    <Stack>
      <Card>
        <CardMedia
          sx={{ height: 140 }}
          image="https://images.unsplash.com/photo-1502657877623-f66bf489d236?auto=format&fit=crop&w=800"
          title="some title"
        />
        <CardContent>
          <Typography>
            <h4
              className={Styles.cardHeader}
            >
              {props.title}
            </h4>
            <div
              className={Styles.cardText}
            >
              {props.description}
            </div>

            <Button
              className={Styles.cardButton}
              variant="contained"
              onClick={() => navigate(props.link)}
            >
              Przejdź
            </Button>
          </Typography>
        </CardContent>
      </Card>
    </Stack>
  )
}

const Cards: React.FC = () => (
  <Stack
    gap={1}
  >
    <CardComponent
      title="Kreator wycieczki"
      description="Użyj narzędzi oferowanych przez naszą witrynę aby stworzyć wycieczkę swoich marzeń"
      link={Pages.CREATE_TRAVEL.getRedirectLink()}
    />
    <CardComponent
      title="Plany wycieczek"
      description="Przeglądaj zaplanowane przez siebie wycieczki"
      link={Pages.TRAVEL_RECIPES.getRedirectLink()}
    />
    <CardComponent
      title="Zrealizowane wycieczki"
      description="Przeglądaj odbyte przez siebie wycieczki"
      link={Pages.REALIZED_TRIPS.getRedirectLink()}
    />
  </Stack>
)

export default Cards
