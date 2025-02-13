import React from 'react'
import {
  alpha,
  Box, IconButton,
  Stack,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography, useTheme,
} from '@mui/material'
import {
  AddCircle, Edit, EventNote,
} from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import TrashIcon from '@mui/icons-material/Delete'
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
  const { t } = useTranslation('translation', { keyPrefix: 'travel_page.accommodation_table' })
  const theme = useTheme()

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
            <Tooltip
              key="add-day"
              title={t('add')}
            >
              <IconButton
                color="primary"
                sx={{ bgcolor: `${theme.palette.success.light}20` }}
              >
                <AddCircle
                  key="add-day"
                  color="success"
                  sx={{ cursor: 'pointer' }}
                />
              </IconButton>
            </Tooltip>
          )}
          options={[
            {
              name: t('add_accommodation'),
              action: () => navigate(Pages.ACTIVITY_CREATE.getRedirectLink(), {
                state: {
                  previousPage: pathname,
                  travelRecipe: true,
                  availableTypes: [props.activityType],
                },
              }),
            },
            {
              name: t('pick_accommodation'),
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
              name: t('pick_your_accommodation'),
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
        props.travelElements.length > 0 ? (
          <TableContainer
            sx={{
              borderRadius: '8px',
              boxShadow: `0 4px 12px ${alpha(theme.palette.common.black, 0.1)}`,
              backgroundColor: theme.palette.background.paper,
            }}
          >
            <Table>
              <TableHead>
                <TableRow
                  sx={{
                    fontWeight: 700,
                    color: theme.palette.primary.dark,
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    borderBottom: `2px solid ${theme.palette.primary.main}`,
                    textTransform: 'uppercase',
                  }}
                >
                  <TableCell> {t('name')} </TableCell>
                  <TableCell> {t('place')} </TableCell>
                  <TableCell> {t('days_range')} </TableCell>
                  <TableCell> {t('cost')} </TableCell>
                  <TableCell
                    align="right"
                  >
                    {t('actions')}
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
                        {t('from')} {elem.from}. {t('to')} {elem.to}. {t('day')}
                      </TableCell>
                      <TableCell> {formatter.format(elem.price)} </TableCell>
                      <TableCell
                        align="right"
                      >
                        <Stack
                          direction="row"
                          justifyContent="flex-end"
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
                            travelElement={elem}
                            activity={elem.activity}
                            countDay=""
                          />
                          <Tooltip title={t('delete')}>
                            <IconButton
                              sx={{ bgcolor: `${theme.palette.error.light}20` }}
                            >
                              <TrashIcon
                                color="error"
                                onClick={() => { props.deleteTravelElement(elem.id) }}
                                sx={{
                                  cursor: 'pointer',
                                }}
                              />
                            </IconButton>
                          </Tooltip>

                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
              padding: 4,
              borderRadius: '8px',
              backgroundColor: alpha(theme.palette.primary.main, 0.05),
              boxShadow: `0 4px 12px ${alpha(theme.palette.common.black, 0.1)}`,
              textAlign: 'center',
            }}
          >
            <EventNote
              fontSize="large"
              sx={{
                color: theme.palette.primary.main,
              }}
            />
            <Typography variant="h6" color="text.secondary">
              {t('no_accommodations')}
            </Typography>
          </Box>
        )
      }
    </Collapse.Component>
  )
}

export default TravelGloballyElem
