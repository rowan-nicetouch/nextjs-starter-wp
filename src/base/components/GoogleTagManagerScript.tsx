'use client'

import { ComponentPropsWithoutRef, useEffect } from 'react'
import Script from 'next/script'
import { usePathname, useSearchParams } from 'next/navigation'
import { sendPageview } from 'base/gtm'

/**
 * Google Tag Manager script props.
 *
 * @param {Object} props
 * @param {String} props.gtmId (required) The container ID for Google Tag
 *   Manager. This component will not render if this is a falsy value.
 * @param {String} props.id (optional) `id` attribute to apply to the
 *   `<script>` element. Defaults to "gtm-script".
 * @param {String} props.strategy (optional) The strategy to use for the
 *   Next.js `<Script>` component. Defaults to "afterInteractive".
 */
type GtmScriptProps = ComponentPropsWithoutRef<typeof Script> & {
  gtmId: string,
  id?: string,
}


/**
 * Google Tag Manager script.
 *
 * This component should be rendered only in a layout file inside of a
 * suspense boundary.
 *
 * @see https://react.dev/reference/react/Suspense
 * @see https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#layouts
 * @see https://nextjs.org/docs/app/building-your-application/optimizing/scripts#strategy
 */
export default function GoogleTagManagerScript (props: GtmScriptProps) : JSX.Element|null {
  const { gtmId, id: idProp, ...atts } = props

  // Return early before rendering and effects happen when there is no GTM id.
  if (!gtmId) {
    return null
  }

  const id = idProp ? idProp : 'gtm-script'

  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (pathname) {
      sendPageview(pathname)
    }
  }, [pathname, searchParams])

  return (
    <>
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
      <Script {...atts} id={id}>
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer', '${gtmId}');
        `}
      </Script>
    </>
  )
}
