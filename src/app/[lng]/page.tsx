// 'use client'
// import Link from "next/link"
// import ExerciseForm from "../../components/exercise-form/exerciseForm"
// import LanguageSwitcher from "../../components/header/languageSwitcher"
// import { NextPage } from "next"

// type HomePageProps = {
//   params: {
//     lng: string; // Assuming 'lng' is a string representing a language code
//   };
// }

// const Home: NextPage<HomePageProps> = ({ params: { lng } }) => {
//   return (
//     <>
//       {/* <LanguageSwitcher />
//       <ExerciseForm params={ lng }/> */}
//       <h1>Hi there!</h1>
//       <Link href={`/${lng}/second-page`}>
//         second page
//       </Link>
//     </>
//   )
// }
// export default Home;
import Link from 'next/link'
import { useTranslation } from '../i18'
import { Footer } from './components/Footer'

const Page = async ({ params: { lng } }: { params: { lng: string }}) => {
  const { t } = await useTranslation(lng)
  return (
    <>
      <h1>{t('title')}</h1>
      <Link href={`/${lng}/second-page`}>
        {t('to-second-page')}
      </Link>
      <br />
      <Link href={`/${lng}/client-page`}>
        {t('to-client-page')}
      </Link>
      <Footer lng={lng}/>
    </>
  )
}

export default Page;

