import React from 'react'
import {
  Stack,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from '@mui/material'
import { AddCircle, Cancel, Edit } from '@mui/icons-material'
import { ActivityType, GloballyTravelElement } from '../../../../model'
import * as Collapse from '../../../../components/UI/Collapse'
import * as SplitButton from '../../../../components/UI/SplitButton'
import { useRouter } from '../../../../hooks'
import { Pages } from '../../../pages'
import * as SaveActivityModal from '../../../../components/SaveActivityModal'

type Props = {
  title: string
  travelElements: GloballyTravelElement[]
  // eslint-disable-next-line no-unused-vars
  deleteTravelElement: (id: string) => void
  activityType: ActivityType
}

const TravelGloballyElem: React.FC<Props> = (props) => {
  const {
    navigate,
    pathname,
  } = useRouter()

  // TODO: make formatter global
  const formatter = Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'PLN',
  })

  return (
    <Collapse.Component
      title={props.title}
      defaultOpen
      nodeOptions={[
        <SplitButton.Component
          key="add-element"
          button={(
            <AddCircle
              color="success"
            />
          )}
          options={[
            {
              name: 'Stwórz i dodaj nowy nocleg',
              action: () => navigate(Pages.ACTIVITY_CREATE.getRedirectLink(), {
                state: {
                  previousPage: pathname,
                  travelRecipe: true,
                  availableTypes: [props.activityType],
                },
              }),
            },
            {
              name: 'Wybierz z istniejących noclegów',
              action: () => navigate(Pages.LIST_ACTIVITY.getRedirectLink(), {
                state: {
                  previousPage: pathname,
                  types: [props.activityType],
                  travelRecipe: true,
                  source: 'system',
                },
              }),
            },
            {
              name: 'Wybierz z stworzonych przez siebie noclegów',
              action: () => navigate(Pages.LIST_ACTIVITY.getRedirectLink(), {
                state: {
                  previousPage: pathname,
                  types: [props.activityType],
                  travelRecipe: true,
                  source: 'user',
                },
              }),
            },
          ]}
        />,
      ]}
    >
      {
        props.travelElements.length > 0 && (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell> Nazwa </TableCell>
                  <TableCell> Miejsce </TableCell>
                  <TableCell> Zakres dni </TableCell>
                  <TableCell> Cena </TableCell>
                  <TableCell
                    align="center"
                  >
                    Akcje
                  </TableCell>
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
                      <TableCell
                        align="center"
                      >
                        <Stack
                          direction="row"
                          gap={1}
                        >
                          <SaveActivityModal.Component
                            button={(
                              <Edit
                                color="primary"
                                sx={{
                                  cursor: 'pointer',
                                }}
                              />
                            )}
                            travelElement={elem}
                            activity={elem.activity}
                            countDay=""
                          />
                          <Cancel
                            color="error"
                            onClick={() => { props.deleteTravelElement(elem.id) }}
                            sx={{
                              cursor: 'pointer',
                            }}
                          />
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </TableContainer>
        )
      }
    </Collapse.Component>
  )
}

export default TravelGloballyElem
