'use client'

import Link from 'next/link'
import { useTranslation } from '../../i18/client'
import { Footer } from '../components/Footer/client'
import TrainingForm from '../components/TrainingForm/TrainingForm'

const ClientPage = ({ params: { lng } } : { params: { lng: string }}) => {
  const { t } = useTranslation(lng, 'client-page')

  return (
    <>
    <TrainingForm lng={lng} /> 
    <Link href={`/${lng}`}>
      <button type="button">
        {t('back-to-home')}
      </button>
    </Link>
    <Footer lng={lng} />
    </>
  )
}

export default ClientPage