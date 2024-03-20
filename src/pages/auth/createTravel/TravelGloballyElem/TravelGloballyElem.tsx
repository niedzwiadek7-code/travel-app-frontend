import React from 'react'
import {
  Button, Stack,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography,
} from '@mui/material'
import { ActivityType, GloballyTravelElement } from '../../../../model'
import AddTravelElemButton from './AddTravelElemButton'

type Props = {
  title: string
  travelElements: GloballyTravelElement[]
  // eslint-disable-next-line no-unused-vars
  deleteTravelElement: (id: string) => void
  activityType: ActivityType
}

const TravelGloballyElem: React.FC<Props> = (props) => {
  // TODO: make formatter global
  const formatter = Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'PLN',
  })

  return (
    <Stack>
      <Typography
        variant="h5"
        component="h5"
      >
        {props.title}
      </Typography>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell> Nazwa </TableCell>
              <TableCell> Miejsce </TableCell>
              <TableCell> Zakres dni </TableCell>
              <TableCell> Cena </TableCell>
              <TableCell> Odwołaj </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {
              props.travelElements.map((elem) => (
                <TableRow key={elem.activity.id}>
                  <TableCell> {elem.activity.name} </TableCell>
                  <TableCell> {elem.activity.place} </TableCell>
                  <TableCell>
                    {elem.from} dzień - {elem.to} dzień
                  </TableCell>
                  <TableCell> {formatter.format(elem.price)} </TableCell>
                  <TableCell>
                    <Button
                      type="button"
                      variant="contained"
                      color="error"
                      onClick={() => { props.deleteTravelElement(elem.id) }}
                    >
                      Odwołaj
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>

      <AddTravelElemButton
        activityType={props.activityType}
      />
    </Stack>
  )
}

export default TravelGloballyElem
