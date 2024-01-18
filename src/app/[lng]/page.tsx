import Link from 'next/link'
import { useTranslation } from '../i18'
import { Footer } from './components/Footer'
import HomeWrapper from './components/HomeWrapper/HomeWrapper'

const Page = async ({ params: { lng } }: { params: { lng: string }}) => {
  const { t } = await useTranslation(lng)
  return (
    <>
      <h1>{t('title')}</h1>
      <br />
      <HomeWrapper lng={lng}/>
      <Footer lng={lng}/>
    </>
  )
}

export default Page;

