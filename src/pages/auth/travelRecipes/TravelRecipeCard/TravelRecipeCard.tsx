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
import { UserTravelRecipe } from '../../../../services/backend/Travel/dto'
import MenuComponent from './Menu'

type Props = {
  userTravelRecipe: UserTravelRecipe
}

const TravelRecipeCard: React.FC<Props> = (props) => {
  const theme = useTheme()
  const formatter = Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'PLN',
  })

  const calculateTotalPrice = () => {
    const activityPrice = props.userTravelRecipe.elements.reduce(
      (acc, elem) => acc + elem.price,
      0,
    )

    const accommodationPrice = props.userTravelRecipe.accommodations.reduce(
      (acc, elem) => acc + elem.price,
      0,
    )

    return formatter.format(activityPrice + accommodationPrice)
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'Atrakcja':
        return <AttractionIcon style={{ color: theme.palette.primary.main }} />
      case 'Podróż':
        return <TravelIcon style={{ color: theme.palette.primary.main }} />
      case 'Restauracja':
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
          <MenuComponent
            travelRecipeId={props.userTravelRecipe.id.toString()}
          />
        )}
      />

      <CardContent>
        <Stack>
          <Typography variant="body1">
            Wycieczka została zaplanowana na <b> {props.userTravelRecipe.countDays} dni </b>
          </Typography>

          <Typography variant="body1">
            Szacowany budżet wycieczki wynosi <b> {calculateTotalPrice()} </b>
          </Typography>

          <Typography
            variant="body1"
            style={{ marginTop: '.5em' }}
          >
            Lista rzeczy zaplanowanych na tę wycieczkę:
          </Typography>

          <List>
            {
              props.userTravelRecipe.elements.map((elem) => (
                <ListItem
                  key={elem.name}
                  style={{ margin: 0, padding: 0 }}
                >
                  <ListItemIcon>
                    { getIcon(elem.activityType) }
                  </ListItemIcon>
                  <ListItemText> {elem.name} </ListItemText>
                </ListItem>
              ))
            }
          </List>

          <Button
            type="button"
            variant="contained"
            color="primary"
            onClick={() => {}}
          >
            Wybierz się na wycieczkę
          </Button>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default TravelRecipeCard
