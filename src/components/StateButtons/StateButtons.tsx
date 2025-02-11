import React, { cloneElement, ReactElement, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { StateDto } from './dto/state.dto'
import { useAuth, useDependencies } from '../../context'
import { useRouter } from '../../hooks'
import { Pages } from '../../pages/pages'
import { Activity } from '../../model'
import * as SaveActivityModal from '../SaveActivityModal'
import * as SaveInstanceActivityModal from '../SaveInstanceActivityModal'

type Props = {
  acceptButton: ReactNode,
  deleteButton: ReactNode,
  addButton: ReactNode,
  activity: Activity,
}

const StateButtons: React.FC<Props> = ({
  acceptButton,
  deleteButton,
  addButton,
  activity,
}) => {
  const { state, navigate } = useRouter<StateDto, {}, {}>()
  const { getApiService, getToastUtils } = useDependencies()
  const toastUtils = getToastUtils()
  const { token } = useAuth()
  const apiService = getApiService()
  const activityService = apiService.getActivity(token)
  const { t } = useTranslation('translation', { keyPrefix: 'state_buttons' })

  const handleAccept = async (id: number) => {
    try {
      await activityService.acceptActivity(id)
      toastUtils.Toast.showToast(toastUtils.types.SUCCESS, t('accept_message'))
      navigate(Pages.LIST_ACTIVITY.getRedirectLink(), { state })
    } catch (err) {
      toastUtils.Toast.showToast(toastUtils.types.ERROR, 'error')
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await activityService.restoreActivity(id)
      toastUtils.Toast.showToast(toastUtils.types.SUCCESS, t('reject_message'))
      navigate(Pages.LIST_ACTIVITY.getRedirectLink(), { state })
    } catch (err) {
      toastUtils.Toast.showToast(toastUtils.types.ERROR, 'error')
    }
  }

  if (state?.admin) {
    return (
      <>
        {cloneElement(acceptButton as ReactElement, { onClick: () => handleAccept(activity.id) })}
        {cloneElement(deleteButton as ReactElement, { onClick: () => handleDelete(activity.id) })}
      </>
    )
  }

  if (state?.travelRecipe) {
    return (
      <SaveActivityModal.Component
        button={addButton}
        activity={activity}
        countDay={state?.countDay || ''}
      />
    )
  }

  if (state?.travelInstance) {
    return (
      <SaveInstanceActivityModal.Component
        button={addButton}
        activity={activity}
        date={state?.date || ''}
      />
    )
  }

  return null
}

export default StateButtons
