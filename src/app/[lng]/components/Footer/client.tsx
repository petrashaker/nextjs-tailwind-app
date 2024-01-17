'use client'

import { FooterBase } from './FooterBase'
import { useTranslation } from '../../../i18/client'

export const Footer = (props: { lng: string }) => {
  const { t } = useTranslation(props.lng, 'footer')
  return <FooterBase t={t} lng={props.lng} />
}