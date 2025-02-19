import React from 'react'
import {
  Delete,
  Edit,
  Menu as MenuIcon,
} from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import { Pages } from '../../../../pages'
import * as SplitButton from '../../../../../components/UI/SplitButton'
import { useRouter } from '../../../../../hooks'

type Props = {
  travelRecipeId: string
  deleteTravelRecipe: () => void
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
          <MenuIcon
            sx={{
              paddingX: 1,
              // paddingTop: 0.75,
            }}
          />
        )}
        options={[
          {
            name: t('edit_plan'),
            Icon: Edit,
            action: () => navigate(Pages.EDIT_TRAVEL.getRedirectLink({
              id: props.travelRecipeId,
            })),
          },
          {
            name: t('delete_plan'),
            Icon: Delete,
            action: props.deleteTravelRecipe,
          },
        ]}
      />
    </div>
  )
}

export default MenuComponent
