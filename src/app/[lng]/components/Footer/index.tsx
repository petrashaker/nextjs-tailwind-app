import { useTranslation } from '../../../i18'
import { FooterBase } from './FooterBase'

export const Footer = async (props: { lng: string }) => {
  const { t } = await useTranslation((props.lng, 'footer'))
  return <FooterBase t={t} lng={props.lng} />
}