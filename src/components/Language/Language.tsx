import React from 'react'
import { LanguageOutlined } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import * as SplitButton from '../UI/SplitButton'

const Language = () => {
  const { i18n } = useTranslation()

  return (
    <SplitButton.Component
      button={(
        <LanguageOutlined
          color="primary"
        />
      )}
      options={[
        {
          name: 'Polski',
          action: () => i18n.changeLanguage('pl'),
        },
        {
          name: 'English',
          action: () => i18n.changeLanguage('en'),
        },
      ]}
    />
  )
}

export default Language
