import { wpFetch } from 'base/fetch'

/**
 * Returns site-wide data from the WordPress REST API.
 */
export async function wpGetSiteData (urlParams?:any, fetchOptions?:any) {
  try {
    const resource = '/nt-sitewide-data/v1/public'
    const response = await wpFetch(resource, urlParams, fetchOptions)
    if (!response.ok) {
      throw new Error('Unable to fetch page data from WordPress')
    }
    const json = await response.json()
    return json
  } catch (error:any) {
    throw new Error(
      typeof error?.message === 'string'
        ? 'wpGetSiteData() - ' + error.message
        : 'wpGetSiteData() - Error'
    )
  }
}
