import { getWpApiUrl } from 'base/fetch'
import { WpFetchParams } from 'base/types'

/**
 * Fetch from WordPress REST API v2
 */
export async function wpFetch (
  endpoint:string,
  urlParams:WpFetchParams,
  fetchOptions:RequestInit | undefined
) : Promise<Response> {
  // Ensure that a revalidation strategy is always present. We cannot set both
  // `fetchOptions.cache` and `fetchOptions.next.revalidate` at the same time.
  // Next produces a warning in such cases.
  const hasCache = typeof fetchOptions?.cache !== 'undefined'
  const hasRevalidate = typeof fetchOptions?.next?.revalidate !== 'undefined'
  if (!hasCache && !hasRevalidate) {
    fetchOptions = {
      ...fetchOptions,
      ...{
        next: {
          revalidate: 10
        }
      }
    }
  }

  const resource = getWpApiUrl(endpoint, urlParams)
  const response = await fetch(resource, fetchOptions)

  return response
}
