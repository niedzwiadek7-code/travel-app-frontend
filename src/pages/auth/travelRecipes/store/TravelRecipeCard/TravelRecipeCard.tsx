import React from 'react'
import {
  Button,
  Card, CardContent, CardHeader, List, ListItem,
  ListItemIcon, ListItemText, Stack, Typography, useTheme,
} from '@mui/material'
import {
  Restaurant as RestaurantIcon,
  Attractions as AttractionIcon,
  AirplanemodeActive as TravelIcon,
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ActivityType, TravelRecipe } from '../../../../../model'
import MenuComponent from './Menu'
import { Pages } from '../../../../pages'
import * as SignUpForTrip from '../../../../../components/SignUpForTrip'
import * as CopyToClipboard from '../../../../../components/UI/CopyToClipboard'

type Props = {
  userTravelRecipe: TravelRecipe
}

const TravelRecipeCard: React.FC<Props> = (props) => {
  const navigate = useNavigate()
  const theme = useTheme()
  const formatter = Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'PLN',
  })
  const { t } = useTranslation('translation', { keyPrefix: 'travel_recipes_store_page' })

  const calculateTotalPrice = () => {
    const activityPrice = props.userTravelRecipe.travelElements.reduce(
      (acc, elem) => acc + elem.price,
      0,
    )

    const accommodationPrice = props.userTravelRecipe.accommodations.reduce(
      (acc, elem) => acc + elem.price,
      0,
    )

    return formatter.format(activityPrice + accommodationPrice)
  }

  const getIcon = (type: ActivityType) => {
    switch (type) {
      case 'Attraction':
        return <AttractionIcon style={{ color: theme.palette.primary.main }} />
      case 'Trip':
        return <TravelIcon style={{ color: theme.palette.primary.main }} />
      case 'Restaurant':
        return <RestaurantIcon style={{ color: theme.palette.primary.main }} />
      default:
        return <> </>
    }
  }

  return (
    <Card>
      <CardHeader
        title={(
          <Typography>
            { props.userTravelRecipe.name }
          </Typography>
        )}
        style={{
          backgroundColor: theme.palette.primary.main,
          color: 'white',
        }}
        action={(
          <Stack
            direction="row"
          >
            <CopyToClipboard.Component
              color="white"
              fontSize="small"
              text={`${window.location.host}/travel-recipe/${props.userTravelRecipe.id}`}
            />
            <MenuComponent
              travelRecipeId={props.userTravelRecipe.id.toString()}
            />
          </Stack>
        )}
      />

      <CardContent>
        <Stack>
          <Typography variant="body1">
            {t('travel_planned_to')} <b> {props.userTravelRecipe.countDays} {t('days')} </b>
          </Typography>

          <Typography variant="body1">
            {t('budget')} <b> {calculateTotalPrice()} </b>
          </Typography>

          <Typography
            variant="body1"
            style={{ marginTop: '.5em' }}
          >
            {t('planned_activities')}:
          </Typography>

          <List>
            {
              props.userTravelRecipe.travelElements.map((elem) => (
                <ListItem
                  key={elem.activity.name}
                  style={{ margin: 0, padding: 0 }}
                >
                  <ListItemIcon>
                    { getIcon(elem.activity.activityType) }
                  </ListItemIcon>
                  <ListItemText> {elem.activity.name} </ListItemText>
                </ListItem>
              ))
            }
          </List>

          <Button
            type="button"
            variant="contained"
            color="primary"
            style={{ width: '100%', marginTop: '.7em', marginBottom: '.7em' }}
            onClick={() => navigate(Pages.TRAVEL_RECIPES_GET.getRedirectLink({
              id: props.userTravelRecipe.id.toString(),
            }))}
          >
            {t('browse')}
          </Button>

          <SignUpForTrip.Component
            id={props.userTravelRecipe.id}
            name={props.userTravelRecipe.name}
          />

        </Stack>
      </CardContent>
    </Card>
  )
}

export default TravelRecipeCard
