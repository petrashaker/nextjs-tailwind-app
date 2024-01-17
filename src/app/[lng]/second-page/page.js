import { useTranslation } from '@/app/i18'
import Link from 'next/link'
import { Footer } from '../components/Footer'


export default async function Page({ params: { lng } }) {
  const { t } = await useTranslation((lng, 'second-page'));
  return (
    <>
      <h1>{t('title')}</h1>
      <Link href={`/${lng}`}>
        {t('backToHome')}
      </Link>
      <Footer lng={lng} />
    </>
  )
}