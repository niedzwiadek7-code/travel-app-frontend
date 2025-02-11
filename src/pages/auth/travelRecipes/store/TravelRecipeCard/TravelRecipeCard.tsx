import React, { useState } from 'react'
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
  useTheme,
  alpha,
} from '@mui/material'
import {
  Restaurant as RestaurantIcon,
  Attractions as AttractionIcon,
  AirplanemodeActive as TravelIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon, TravelExplore, EventAvailable,
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ActivityType, TravelRecipe } from '../../../../../model'
import MenuComponent from './Menu'
import { Pages } from '../../../../pages'
import * as SignUpForTrip from '../../../../../components/SignUpForTrip'
import * as CopyToClipboard from '../../../../../components/UI/CopyToClipboard'

type Props = {
  userTravelRecipe: TravelRecipe;
  deleteTravelRecipe: () => void;
};

const TravelRecipeCard: React.FC<Props> = ({
  userTravelRecipe,
  deleteTravelRecipe,
}) => {
  const AVAILABLE_ACTIVITIES_PER_TRAVEL = 3

  const navigate = useNavigate()
  const theme = useTheme()
  const formatter = Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'PLN',
  })
  const { t } = useTranslation('translation', { keyPrefix: 'travel_recipes_store_page' })

  const [showAllActivities, setShowAllActivities] = useState(false)
  const activities = userTravelRecipe.travelElements
  const showMoreButton = activities.length > AVAILABLE_ACTIVITIES_PER_TRAVEL
  const displayedActivities = showAllActivities
    ? activities
    : activities.slice(0, AVAILABLE_ACTIVITIES_PER_TRAVEL)

  const calculateTotalPrice = () => {
    const activityPrice = userTravelRecipe.travelElements.reduce(
      (acc, elem) => acc + elem.price,
      0,
    )

    const accommodationPrice = userTravelRecipe.accommodations.reduce(
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
    <Card
      sx={{
        borderRadius: '12px',
        boxShadow: theme.shadows[2],
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: theme.shadows[4],
        },
      }}
    >
      <CardHeader
        sx={{
          backgroundColor: alpha(theme.palette.primary.main, 0.9),
          color: theme.palette.common.white,
          borderTopLeftRadius: '12px',
          borderTopRightRadius: '12px',
          padding: theme.spacing(2),
        }}
        title={(
          <Typography variant="h6" fontWeight={700}>
            {userTravelRecipe.name}
          </Typography>
        )}
        action={(
          <Stack direction="row" alignItems="center" gap={1}>
            <CopyToClipboard.Component
              color="white"
              fontSize="small"
              text={`${window.location.host}/travel-recipe/${userTravelRecipe.id}`}
            />
            <MenuComponent
              travelRecipeId={userTravelRecipe.id.toString()}
              deleteTravelRecipe={deleteTravelRecipe}
            />
          </Stack>
        )}
      />

      <CardContent>
        <Stack gap={2}>
          <Typography variant="body1" color="text.secondary">
            {t('travel_planned_to')}{' '}
            <Typography component="span" fontWeight={600} color="text.primary">
              {userTravelRecipe.countDays} {t('days')}
            </Typography>
          </Typography>

          <Typography variant="body1" color="text.secondary">
            {t('budget')}{' '}
            <Typography component="span" fontWeight={600} color="text.primary">
              {calculateTotalPrice()}
            </Typography>
          </Typography>

          {
            displayedActivities.length > 0 && (
              <Stack>
                <Typography
                  variant="body1"
                  fontWeight={600}
                  color="text.primary"
                >
                  {t('planned_activities')}:
                </Typography>

                <List dense>
                  {displayedActivities.map((elem) => (
                    <ListItem key={elem.activity.name} sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: '40px' }}>
                        {getIcon(elem.activity.activityType)}
                      </ListItemIcon>
                      <ListItemText
                        primary={elem.activity.name}
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                  ))}
                  {
                    showMoreButton && (
                      <ListItem
                        sx={{ px: 0, cursor: 'pointer' }}
                        onClick={() => setShowAllActivities(!showAllActivities)}
                      >
                        <ListItemIcon sx={{ minWidth: '40px' }}>
                          {showAllActivities ? (
                            <ExpandLessIcon color="primary" />
                          ) : (
                            <ExpandMoreIcon color="primary" />
                          )}
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            showAllActivities ? t('show_less') : t('show_more')
                          }
                          primaryTypographyProps={{
                            variant: 'body2',
                            color: 'primary',
                            fontWeight: 500,
                          }}
                        />
                      </ListItem>
                    )
                  }
                </List>
              </Stack>
            )
          }

          <Stack
            display="flex"
            gap={1}
            justifyContent={{
              xs: 'flex-start',
              md: 'flex-end',
            }}
            flexDirection={{
              xs: 'column',
              md: 'row',
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate(
                Pages.TRAVEL_RECIPES_GET.getRedirectLink({
                  id: userTravelRecipe.id.toString(),
                }),
              )}
              startIcon={<TravelExplore />}
            >
              {t('browse')}
            </Button>

            <SignUpForTrip.Component
              id={userTravelRecipe.id}
              name={userTravelRecipe.name}
              button={(
                <Button
                  type="button"
                  variant="contained"
                  color="primary"
                  sx={{ width: '100%' }}
                  startIcon={<EventAvailable />}
                  onClick={() => {}}
                >
                  {t('plan_travel')}
                </Button>
              )}
            />
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default TravelRecipeCard
