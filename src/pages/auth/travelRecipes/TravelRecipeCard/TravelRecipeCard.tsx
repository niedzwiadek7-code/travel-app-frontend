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
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { UserTravelRecipeDto, PlanATravelDto } from '../../../../services/backend/Travel/dto'
import * as Modal from '../../../../components/UI/Modal'
import * as Input from '../../../../components/UI/Input'
import MenuComponent from './Menu'
import { useDependencies } from '../../../../context/dependencies'
import { useAuth } from '../../../../context/auth'
import { Pages } from '../../../pages'

type Props = {
  userTravelRecipe: UserTravelRecipeDto
}

type ModalInputs = {
  startDate: Date,
}

const TravelRecipeCard: React.FC<Props> = (props) => {
  const { getApiService, getToastUtils } = useDependencies()
  const toastUtils = getToastUtils()
  const apiService = getApiService()
  const { token } = useAuth()
  const travelService = apiService.getTravel(token)
  const navigate = useNavigate()

  const theme = useTheme()
  const formatter = Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'PLN',
  })

  const {
    register, handleSubmit,
  } = useForm<ModalInputs>()

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

  const onSubmit = async (data: ModalInputs) => {
    try {
      const payload: PlanATravelDto = {
        travelRecipeId: props.userTravelRecipe.id.toString(),
        startDate: data.startDate,
      }
      const result = await travelService.createATravelInstance(payload)
      navigate(Pages.TAKING_TRIP.getRedirectLink({
        id: result.id.toString(),
      }))
    } catch (e) {
      toastUtils.Toast.showToast(
        toastUtils.types.ERROR,
        'Wystąpił nieoczekiwany błąd',
      )
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

          <form
            onSubmit={handleSubmit(onSubmit)}
          >
            <Modal.Component
              buttonComponent={(
                <Button
                  type="button"
                  variant="contained"
                  color="primary"
                  style={{ width: '100%' }}
                  onClick={() => {}}
                >
                  Wybierz się na wycieczkę
                </Button>
              )}
              title={`Zapisz się na wycieczkę ${props.userTravelRecipe.name}`}
              content={(
                <Input.Component
                  variant={Input.Variant.OUTLINED}
                  type={Input.Type.DATE}
                  label="Podaj datę początkową"
                  data={register('startDate')}
                />
              )}
              actions={[
                {
                  name: 'Wybierz się na wycieczkę',
                  type: 'submit',
                  onClick: handleSubmit(onSubmit),
                },
              ]}
            />
          </form>

        </Stack>
      </CardContent>
    </Card>
  )
}

export default TravelRecipeCard
