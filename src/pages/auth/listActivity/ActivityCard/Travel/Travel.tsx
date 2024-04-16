import React from 'react'
import { Button, Stack, useTheme } from '@mui/material'
import { useTranslation } from 'react-i18next'
import * as SaveActivityModal from '../../../../../components/SaveActivityModal'
import * as SaveInstanceActivityModal from '../../../../../components/SaveInstanceActivityModal'
import AdminButtons from '../AdminButtons'
import { StateDto } from '../../dto/state.dto'
import * as Rating from '../../../../../components/Rating'
import { ExtendedActivityFormat } from '../../../../../services/backend/Activity/types'

type Props = {
  activity: ExtendedActivityFormat
  state: StateDto
  acceptElement: () => any
  deleteElement: () => any
}

const Travel: React.FC<Props> = (props) => {
  const theme = useTheme()
  const { t } = useTranslation('translation', { keyPrefix: 'activity_list_page.activities' })

  const formatter = Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'PLN',
  })

  // @ts-ignore
  return (
    <Stack
      key={props.activity.id}
      gap={1}
      style={{ padding: '.8em', backgroundColor: theme.palette.grey['200'], borderRadius: '.8em' }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <div> {props.activity.name} </div>
        <div>
          { `${props.activity.from} - ${props.activity.to}` }
        </div>
        <div>
          {formatter.format(props.activity.price)}
        </div>
      </Stack>
      <hr
        style={{ backgroundColor: theme.palette.grey['900'], height: '1px', width: '100%' }}
      />
      <Stack
        gap={2}
      >
        <Stack>
          {props.activity.description.split('\n').map((line, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </Stack>

        {
          props.activity.ratings.length > 0 && !props.state.admin && (

            <Stack>
              <h3
                style={{ margin: 0 }}
              >
                {t('rating')}
              </h3>

              {
                props.activity.ratings.map((rating) => (
                  <Rating.Component
                    key={rating.text}
                    {...rating}
                  />
                ))
              }
            </Stack>
          )
        }

        <Stack>
          {
            props.state?.travelRecipe && (
              <SaveActivityModal.Component
                button={(
                  <Button
                    type="button"
                    variant="contained"
                    sx={{ width: '100%' }}
                  >
                    {t('add_to_travel')}
                  </Button>
                )}
                activity={props.activity}
                countDay={props.state.countDay}
              />
            )
          }
          {
            props.state?.travelInstance && (
              <SaveInstanceActivityModal.Component
                activity={props.activity}
                date={props.state.date}
              />
            )
          }
          {
            props.state?.admin && (
              <AdminButtons
                acceptElement={props.acceptElement}
                deleteElement={props.deleteElement}
                activityId={props.activity.id.toString()}
              />
            )
          }
        </Stack>
      </Stack>
    </Stack>
  )
}

export default Travel
