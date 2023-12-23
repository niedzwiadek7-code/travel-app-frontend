import React from 'react'
import {
  Card, CardContent, Typography, Button, CardMedia, Grid,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Styles from './Cards.module.scss'
import { Pages } from '../../../pages'
import { useAuth } from '../../../../context/auth'
import { Roles } from '../../../../model'
import CreateTravel from '../../../../assets/theme/dashboard/create-travel.jpg'
import TravelPlans from '../../../../assets/theme/dashboard/travel-plans.jpg'
import RealizedTravels from '../../../../assets/theme/dashboard/realized-travels.jpg'
import Manage from '../../../../assets/theme/dashboard/manage.jpg'

type CardProps = {
  image: string
  title: string,
  description: string,
  link: () => any,
}

const CardComponent: React.FC<CardProps> = (props) => (
  <Grid
    item
    key={props.title}
    xs={12}
    md={4}
    lg={6}
    xl={4}
  >
    <Card>
      <CardMedia
        sx={{ height: 140 }}
        image={props.image}
      />
      <CardContent>
        <Typography
          style={{
            margin: 0,
          }}
        >
          <h3
            className={Styles.cardHeader}
          >
            {props.title}
          </h3>
          <div
            className={Styles.cardText}
          >
            {props.description}
          </div>
        </Typography>

        <Button
          className={Styles.cardButton}
          variant="contained"
          onClick={props.link}
        >
          Przejdź
        </Button>
      </CardContent>
    </Card>
  </Grid>
)

const Cards: React.FC = () => {
  const navigate = useNavigate()
  const { roles } = useAuth()

  return (
    <Grid
      container
      spacing={2}
    >
      <CardComponent
        image={CreateTravel}
        title="Kreator wycieczki"
        description="Użyj narzędzi oferowanych przez naszą witrynę aby stworzyć wycieczkę swoich marzeń"
        link={() => navigate(Pages.CREATE_TRAVEL.getRedirectLink())}
      />
      <CardComponent
        image={TravelPlans}
        title="Plany wycieczek"
        description="Przeglądaj zaplanowane przez siebie wycieczki"
        link={() => navigate(Pages.TRAVEL_RECIPES_STORE.getRedirectLink())}
      />
      <CardComponent
        image={RealizedTravels}
        title="Zrealizowane wycieczki"
        description="Przeglądaj odbyte przez siebie wycieczki"
        link={() => navigate(Pages.REALIZED_TRIPS.getRedirectLink())}
      />

      {
        roles?.includes(Roles.ADMIN) && (
          <>
            <CardComponent
              image={Manage}
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
              image={Manage}
              title="Zarządzaj noclegami"
              description="Rozwijaj listę noclegów polecanych przez system"
              link={() => navigate(Pages.ADD_ACCOMMODATION.getRedirectLink(), {
                state: {
                  admin: true,
                  source: 'toAccept',
                },
              })}
            />
          </>
        )
      }
    </Grid>
  )
}

export default Cards
