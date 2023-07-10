import { Suspense } from 'react'
import GoogleTagManagerScript from 'base/components/GoogleTagManagerScript'
import { GTM_ID } from 'base/gtm'
import './globals.scss'

// @todo Replace this.
export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Suspense>
          <GoogleTagManagerScript gtmId={GTM_ID} />
        </Suspense>
        {children}
      </body>
    </html>
  )
}
