import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
  alpha,
  Stack, LinearProgress, Tooltip, IconButton,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Visibility } from '@mui/icons-material'
import { useAppSelector } from '../../../../app/hooks'
import { RootState } from '../../../../app/store'
import { Pages } from '../../../pages'
import { DateHandler } from '../../../../utils/Date'
import { ActivityScope, locallyActivityTypes } from '../../../../model'
import { useRouter } from '../../../../hooks'

const TripTable: React.FC = () => {
  const { navigate } = useRouter()
  const { t } = useTranslation('translation', { keyPrefix: 'taking_trip_page.trip_table' })
  const theme = useTheme()

  const travelInstance = useAppSelector((state: RootState) => state.travelInstance)

  const travelElements: Record<string, { passed: number; count: number }> = {}

  travelInstance.travelElements.forEach((elem) => {
    const activityScope: ActivityScope = locallyActivityTypes.includes(elem.activity.activityType)
      ? 'Locally'
      : 'Globally'

    if (activityScope === 'Globally') {
      return
    }

    const dateString = new DateHandler(elem.from).format('YYYY-MM-DD')

    if (!travelElements[dateString]) {
      travelElements[dateString] = {
        passed: 0,
        count: 0,
      }
    }

    travelElements[dateString].passed += elem.passed ? 1 : 0
    travelElements[dateString].count += 1
  })

  const dates = Object.keys(travelElements).sort((a, b) => DateHandler.compareDates(b, a))

  return (
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
            <TableCell>
              <Typography variant="subtitle2">{t('day')}</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2">{t('activities_end')}</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2">{t('actions')}</Typography>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {dates.map((date) => {
            const progress = (travelElements[date].passed / travelElements[date].count) * 100

            return (
              <TableRow key={date}>
                <TableCell>
                  <Typography variant="body1">{date}</Typography>
                </TableCell>
                <TableCell>
                  <Stack
                    direction="row"
                    alignItems="center"
                    gap={2}
                  >
                    <Typography
                      variant="body1"
                      // sx={{
                      //   display: {
                      //     xs: 'none',
                      //     md: 'block',
                      //   },
                      // }}
                    >
                      {travelElements[date].passed} / {travelElements[date].count}
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={progress}
                      sx={{
                        flexGrow: 1,
                        height: '10px',
                        borderRadius: '5px',
                        backgroundColor: alpha(theme.palette.primary.main, 0.1),
                        '& .MuiLinearProgress-bar': {
                          borderRadius: '5px',
                          backgroundColor: theme.palette.primary.main,
                        },
                      }}
                    />
                    <Typography
                      variant="body1"
                      fontWeight={600}
                      sx={{
                        display: {
                          xs: 'none',
                          md: 'block',
                        },
                      }}
                    >
                      {`${progress.toFixed(2)}%`}
                    </Typography>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Tooltip title={t('browse')}>
                    <IconButton
                      color="primary"
                      onClick={() => navigate(
                        Pages.TAKING_TRIP_DAY.getRedirectLink({
                          date,
                        }),
                      )}
                    >
                      <Visibility />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TripTable
