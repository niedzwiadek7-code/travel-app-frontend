import React from 'react'
import {
  Menu as MenuIcon,
} from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import { Pages } from '../../../../pages'
import * as SplitButton from '../../../../../components/UI/SplitButton'
import { useRouter } from '../../../../../hooks'

type Props = {
  travelRecipeId: string
}

const MenuComponent: React.FC<Props> = (props) => {
  const {
    navigate,
  } = useRouter()
  const { t } = useTranslation('translation', { keyPrefix: 'travel_recipes_store_page' })

  return (
    <div>
      <SplitButton.Component
        button={(
          <MenuIcon />
        )}
        options={[
          {
            name: t('edit_plan'),
            action: () => navigate(Pages.EDIT_TRAVEL.getRedirectLink({
              id: props.travelRecipeId,
            })),
          },
          {
            name: t('delete_plan'),
            action: () => {},
          },
        ]}
      />
    </div>
  )
}

export default MenuComponent
