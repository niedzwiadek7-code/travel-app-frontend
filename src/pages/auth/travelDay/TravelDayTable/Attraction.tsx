import React from 'react'
import {
  IconButton,
  Stack,
  TableCell, TableRow, Tooltip, useTheme,
} from '@mui/material'
import { Attractions, Cancel, Edit } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import { LocallyTravelElement } from '../../../../model'
import { deleteActivityFromTravel } from '../../../../features/travelRecipe/travelRecipeSlice'
import { useAppDispatch } from '../../../../app/hooks'
import { DateHandler } from '../../../../utils/Date'
import * as SaveActivityModal from '../../../../components/SaveActivityModal'

type Props = {
  travelElement: LocallyTravelElement
}

const Attraction: React.FC<Props> = (props) => {
  const theme = useTheme()
  const dispatch = useAppDispatch()
  const { t } = useTranslation('translation', { keyPrefix: 'travel_day_page.activity' })

  const deleteActivity = (id: string) => {
    dispatch(deleteActivityFromTravel(id))
  }

  const formatter = Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'PLN',
  })

  return (
    <TableRow key={`${props.travelElement.from}-${props.travelElement.to}`}>
      <TableCell>
        <Attractions
          style={{ fill: theme.palette.primary.main }}
        />
      </TableCell>
      <TableCell>
        {new DateHandler(props.travelElement.from).format('HH:mm')} -
        {new DateHandler(props.travelElement.to).format('HH:mm')}
      </TableCell>
      <TableCell> {props.travelElement.activity.name} </TableCell>
      <TableCell>
        { props.travelElement.activity.place
          ? props.travelElement.activity.place
          : `${props.travelElement.activity.from} - ${props.travelElement.activity.to}`}
      </TableCell>
      <TableCell> {props.travelElement.numberOfPeople} </TableCell>
      <TableCell> { formatter.format(props.travelElement.price) } </TableCell>
      <TableCell
        align="center"
      >
        <Stack
          direction="row"
          justifyContent="end"
          gap={1}
        >
          <SaveActivityModal.Component
            button={(
              <Tooltip title={t('edit')}>
                <IconButton
                  color="success"
                  sx={{ bgcolor: `${theme.palette.primary.light}20` }}
                >
                  <Edit
                    color="primary"
                    sx={{
                      cursor: 'pointer',
                    }}
                  />
                </IconButton>
              </Tooltip>

            )}
            travelElement={props.travelElement}
            activity={props.travelElement.activity}
            countDay={props.travelElement.dayCount.toString()}
          />

          <Tooltip
            title={t('delete')}
            onClick={() => { deleteActivity(props.travelElement.id) }}
          >
            <IconButton
              sx={{ bgcolor: `${theme.palette.error.light}20` }}
            >
              <Cancel
                color="error"
                sx={{
                  cursor: 'pointer',
                }}
              />
            </IconButton>
          </Tooltip>
        </Stack>
      </TableCell>
    </TableRow>
  )
}

export default Attraction
