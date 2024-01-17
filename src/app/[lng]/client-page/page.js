'use client'

import Link from 'next/link'
import { useTranslation } from '../../i18/client'
import { Footer } from '../components/Footer/client'
import { useState } from 'react'
import ExerciseForm from '../components/ExerciseForm'

export default function Page({ params: { lng } }) {
  const { t } = useTranslation(lng, 'client-page')
  const [counter, setCounter] = useState(0)
  console.log("trans:", counter);
  return (
    <>
    <h1>{t('title')}</h1>
    <p>{t('counter', { count: counter })}</p>
    <div>
      <button onClick={() => setCounter((prevState) => (Math.max(0, prevState - 1)))}>-</button>
      <button onClick={() => setCounter((prevState) => (Math.min(10, prevState + 1)))}>+</button>
    </div>
    <ExerciseForm lng={lng} /> 
    <Link href={`/${lng}`}>
      <button type="button">
        {t('backToHome')}
      </button>
    </Link>
    <Footer lng={lng} />
    </>
  )
}