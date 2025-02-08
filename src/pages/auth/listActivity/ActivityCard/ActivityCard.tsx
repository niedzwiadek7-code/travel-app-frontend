import React, { useEffect } from 'react'
import {
  Chip,
  IconButton, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Stack, Typography,
} from '@mui/material'
import { AddCircleOutline, Info } from '@mui/icons-material'
import DoneIcon from '@mui/icons-material/Done'
import DeleteIcon from '@mui/icons-material/Delete'
import { useTranslation } from 'react-i18next'
import { StateDto } from '../dto/state.dto'
import { ExtendedActivityFormat } from '../../../../services/backend/Activity/types'
import * as SaveActivityModal from '../../../../components/SaveActivityModal'
import * as SaveInstanceActivityModal from '../../../../components/SaveInstanceActivityModal'
import { ActivityType, getActivityTypeIcon } from '../../../../model'

type Props = {
  activity: ExtendedActivityFormat
  state: StateDto
  acceptElement: () => any
  deleteElement: () => any
}

const ChipComponent: React.FC<{ type: ActivityType }> = ({ type }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'activity_list_page.activities' })
  const Icon = getActivityTypeIcon(type)

  return (
    <Chip
      label={t(type)}
      color="primary"
      icon={<Icon />}
      size="small"
      sx={{
        paddingX: 1,
      }}
    />
  )
}

const ActivityCard: React.FC<Props> = (props) => {
  const [primaryImage, setPrimaryImage] = React.useState<string | null>()
  const { t } = useTranslation('translation', { keyPrefix: 'activity_list_page.activities' })

  useEffect(() => {
    if (props.activity.ratings[0]?.photos[0]) {
      setPrimaryImage(props.activity.ratings[0].photos[0])
    }
  }, [])

  return (
    <ListItem>
      {primaryImage && (
        <ListItemAvatar>
          <img
            src={primaryImage}
            alt={`Activity ${props.activity.name}`}
            style={{
              width: 80,
              height: 80,
              objectFit: 'cover',
              borderRadius: 8,
            }}
          />
        </ListItemAvatar>
      )}
      <ListItemText
        primary={(
          <Typography variant="h6">
            {props.activity.name}
          </Typography>
        )}
        secondary={(
          <Stack
            display="flex"
            flexDirection="column"
            gap={0.5}
            alignItems="flex-start"
            sx={{
              marginTop: 1,
            }}
          >
            {
              props.activity.price && (
                <Typography variant="body2" color="textSecondary">
                  {t('price')}: {props.activity.price}zł
                </Typography>
              )
            }
            <ChipComponent type={props.activity.activityType} />
          </Stack>
        )}
      />
      <ListItemSecondaryAction
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 1,
        }}
      >
        {props.state?.travelRecipe && (
          <SaveActivityModal.Component
            button={(
              <IconButton edge="end" color="primary">
                <AddCircleOutline />
              </IconButton>
            )}
            activity={props.activity}
            countDay={props.state?.countDay || ''}
          />
        )}
        {props.state?.travelInstance && (
          <SaveInstanceActivityModal.Component
            button={(
              <IconButton edge="end" color="primary">
                <AddCircleOutline />
              </IconButton>
            )}
            activity={props.activity}
            date={props.state.date}
          />
        )}
        {props.state?.admin && (
          <>
            <IconButton
              edge="end"
              color="success"
              onClick={props.acceptElement}
            >
              <DoneIcon />
            </IconButton>
            <IconButton
              edge="end"
              color="error"
              onClick={props.deleteElement}
            >
              <DeleteIcon />
            </IconButton>
          </>
        )}
        <IconButton edge="end" color="secondary">
          <Info />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}

export default ActivityCard
