import { readSearchParams } from 'base/read'
import { WpFetchParams } from 'base/types'

/**
 * Get WordPress REST API URL.
 *
 * @param {String} path
 * @param params {@link https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/URLSearchParams | URLSearchParams}
 */
export function getWpApiUrl (
  path:string,
  params:WpFetchParams
) : URL {
  path = typeof path === 'string' ? path : ''
  const domain = process.env.NEXT_PUBLIC_WP_URL
  path = '/wp-json' + path

  const searchParams = readSearchParams(params)

  // This needs to be set for ACF to return nested objects.
  searchParams.append('acf_format', 'standard')

  const query = searchParams.toString()
  if (query.length > 0) {
    path = path + '?' + query
  }

  return new URL(...[path, domain])
}
