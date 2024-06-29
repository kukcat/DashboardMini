import React from 'react'
import { I18nextProvider as I18Next } from 'react-i18next'
import i18n from './i18n'

interface Props {
  children: React.ReactNode
}

const I18nProvider = ({children}: Props) => {

  return (
      <I18Next i18n={i18n}>
        {children}
      </I18Next>
  )
}

export default I18nProvider