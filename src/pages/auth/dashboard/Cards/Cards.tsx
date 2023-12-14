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
  link: () => any,
}

const CardComponent: React.FC<CardProps> = (props) => (
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
            onClick={props.link}
          >
            Przejdź
          </Button>
        </Typography>
      </CardContent>
    </Card>
  </Stack>
)

const Cards: React.FC = () => {
  const navigate = useNavigate()

  return (
    <Stack
      gap={1}
    >
      <CardComponent
        title="Kreator wycieczki"
        description="Użyj narzędzi oferowanych przez naszą witrynę aby stworzyć wycieczkę swoich marzeń"
        link={() => navigate(Pages.CREATE_TRAVEL.getRedirectLink())}
      />
      <CardComponent
        title="Plany wycieczek"
        description="Przeglądaj zaplanowane przez siebie wycieczki"
        link={() => navigate(Pages.TRAVEL_RECIPES_STORE.getRedirectLink())}
      />
      <CardComponent
        title="Zrealizowane wycieczki"
        description="Przeglądaj odbyte przez siebie wycieczki"
        link={() => navigate(Pages.REALIZED_TRIPS.getRedirectLink())}
      />
      <CardComponent
        title="Zarządzaj aktywnościami"
        description="Rozwijaj listę aktywności polecanych przez system"
        link={() => navigate(Pages.ADD_ACTIVITY.getRedirectLink(), {
          state: {
            admin: true,
            source: 'toAccept',
          },
        })}
      />
      <CardComponent
        title="Zarządzaj noclegami"
        description="Rozwijaj listę noclegów polecanych przez system"
        link={() => navigate(Pages.ADD_ACCOMMODATION.getRedirectLink(), {
          state: {
            admin: true,
            source: 'toAccept',
          },
        })}
      />
    </Stack>
  )
}

export default Cards
