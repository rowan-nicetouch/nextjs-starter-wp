export const GTM_ID = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID || null

export function sendPageview (url) {
  window.dataLayer.push({
    event: 'pageview',
    page: url,
  })
}
