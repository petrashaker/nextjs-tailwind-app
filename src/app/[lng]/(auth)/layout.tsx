import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { dir } from 'i18next'
import { languages } from '../../i18/settings'
import StoreProvider from '@/app/StoreProvider'
import './auth.css'

const inter = Inter({ subsets: ['latin'] })

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }))
}

export const metadata: Metadata = {
  title: 'Register page',
  description: 'Page to register company client',
}

const RootLayout = ({
  children,
  params: {
    lng
  }
}: {
  children: React.ReactNode
  params: {
    lng: string
  }
}) => {
  return (
    <html lang={lng} dir={dir(lng)}>
      <body className={inter.className}>
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>   
    </html>
  )
}

export default RootLayout