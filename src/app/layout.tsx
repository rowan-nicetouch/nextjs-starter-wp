import { Suspense } from 'react'
import { readWpSiteData } from 'base/read'
import { wpGetSiteData } from 'base/fetch'
import GoogleTagManagerScript from 'base/components/GoogleTagManagerScript'
import { GTM_ID } from 'base/gtm'
import './globals.scss'

// Types
import { Metadata } from 'next'
import { PropsWithChildren } from 'react'

export async function generateMetadata () : Promise<Metadata>{
  const metadataBase = new URL(process.env.NEXT_PUBLIC_URL ?? '')
  try {
    const response = await wpGetSiteData()
    const siteData = readWpSiteData(response)
    return {
      metadataBase,
      title: siteData.name,
    }
  } catch (error) {
    return {
      metadataBase,
      title: metadataBase.href
    }
  }
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout(props : PropsWithChildren) {
  const { children } = props
  return (
    <html lang="en">
      <body>
        <Suspense>
          <GoogleTagManagerScript gtmId={GTM_ID || ''} />
        </Suspense>
        {children}
      </body>
    </html>
  )
}
