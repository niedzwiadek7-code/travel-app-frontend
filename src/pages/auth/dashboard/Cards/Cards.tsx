import React from 'react'
import {
  Card, CardContent, Typography, Button, CardMedia, Grid, useTheme,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import Styles from './Cards.module.scss'
import { Pages } from '../../../pages'
import { useAuth } from '../../../../context'
import { Roles } from '../../../../model'
import CreateTravel from '../../../../assets/theme/dashboard/create-travel.jpg'
import TravelPlans from '../../../../assets/theme/dashboard/travel-plans.jpg'
import RealizedTravels from '../../../../assets/theme/dashboard/realized-travels.jpg'
import Manage from '../../../../assets/theme/dashboard/manage.jpg'
import { useRouter } from '../../../../hooks'

type CardProps = {
  image: string
  title: string,
  description: string,
  link: () => any,
}

const CardComponent: React.FC<CardProps> = (props) => {
  const { t } = useTranslation('translation', { keyPrefix: 'dashboard' })

  return (
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
            {t('go')}
          </Button>
        </CardContent>
      </Card>
    </Grid>
  )
}

const Cards: React.FC = () => {
  const {
    navigate,
    pathname,
  } = useRouter()
  const theme = useTheme()
  const { roles } = useAuth()
  const { t } = useTranslation('translation', { keyPrefix: 'dashboard' })

  return (
    <Grid
      container
      spacing={2}
      sx={{
        paddingRight: theme.spacing(3),
      }}
    >
      <CardComponent
        image={CreateTravel}
        title={t('travel_creator')}
        description={t('travel_creator_description')}
        link={() => navigate(Pages.CREATE_TRAVEL.getRedirectLink())}
      />
      <CardComponent
        image={TravelPlans}
        title={t('travel_plans')}
        description={t('travel_plans_description')}
        link={() => navigate(Pages.TRAVEL_RECIPES_STORE.getRedirectLink())}
      />
      <CardComponent
        image={RealizedTravels}
        title={t('travel_realized')}
        description={t('travel_realized_description')}
        link={() => navigate(Pages.REALIZED_TRIPS.getRedirectLink())}
      />

      {
        roles?.includes(Roles.ADMIN) && (
          <CardComponent
            image={Manage}
            title={t('activity_manager')}
            description={t('activity_manager_description')}
            link={() => navigate(Pages.LIST_ACTIVITY.getRedirectLink(), {
              state: {
                previousPage: pathname,
                admin: true,
                source: 'toAccept',
              },
            })}
          />
        )
      }
    </Grid>
  )
}

export default Cards
