import React from 'react'
import { Button, Stack, useTheme } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { Accommodation as AccommodationEntity, AccommodationElementInstance } from '../../../../model'
import * as SaveActivityModal from '../../../../components/SaveActivityModal'
import { putAccommodationInstance } from '../../../../features/travelInstance/travelInstanceSlice'
import { Pages } from '../../../pages'
import { useAuth } from '../../../../context/auth'
import { useDependencies } from '../../../../context/dependencies'
import { useAppDispatch } from '../../../../app/hooks'
import { StateDto } from '../dto/state.dto'
import AdminButtons from '../AdminButtons'

type Props = {
  accommodation: AccommodationEntity
  state: StateDto
  acceptElement: () => {}
  deleteElement: () => {}
}

const Accommodation: React.FC<Props> = (props) => {
  const navigate = useNavigate()
  const { token } = useAuth()
  const { getApiService, getToastUtils } = useDependencies()
  const apiService = getApiService()
  const travelService = apiService.getTravel(token)
  const toastUtils = getToastUtils()
  const theme = useTheme()
  const dispatch = useAppDispatch()

  const formatter = Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'PLN',
  })

  const putAccommodationToTravelInstance = async () => {
    try {
      const result = await travelService.addAccommodationToTravelInstance(
        props.state.travelInstance,
        {
          accommodationId: props.accommodation.id.toString(),
        },
      )
      const travelElement = new AccommodationElementInstance({
        id: result.id,
        passed: false,
        photos: [],
        accommodation: props.accommodation,
      })
      dispatch(putAccommodationInstance(travelElement))
      navigate(Pages.TAKING_TRIP.getRedirectLink({
        id: props.state.travelInstance,
      }))
    } catch (err) {
      toastUtils.Toast.showToast(
        toastUtils.types.ERROR,
        'Wystąpił nieoczekiwany błąd',
      )
    }
  }

  return (
    <Stack
      key={props.accommodation.id}
      gap={1}
      style={{ padding: '.8em', backgroundColor: theme.palette.grey['200'], borderRadius: '.8em' }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <div> {props.accommodation.name} </div>
        <div>
          { props.accommodation.place }
        </div>
        <div>
          { formatter.format(props.accommodation.price) } / dzień
        </div>
      </Stack>
      <hr
        style={{ backgroundColor: theme.palette.grey['900'], height: '1px', width: '100%' }}
      />
      <Stack
        gap={2}
      >
        <Stack>
          {props.accommodation.description}
        </Stack>
        <Stack>
          {
            props.state?.travelRecipe && (
              <SaveActivityModal.Component
                activity={props.accommodation}
                countDay=""
              />
            )
          }
          {
            props.state?.travelInstance && (
              <Button
                type="button"
                variant="contained"
                onClick={putAccommodationToTravelInstance}
              >
                Skorzystaj z oferty
              </Button>
            )
          }
          {
            props.state?.admin && (
              <AdminButtons
                acceptElement={props.acceptElement}
                deleteElement={props.deleteElement}
                accommodationId={props.accommodation.id.toString()}
              />
            )
          }

        </Stack>
      </Stack>
    </Stack>
  )
}

export default Accommodation
