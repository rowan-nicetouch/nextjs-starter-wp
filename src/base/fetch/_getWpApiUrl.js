/**
 * Get WordPress REST API URL.
 *
 * @see https://www.advancedcustomfields.com/resources/wp-rest-api-integration/#controlling-output-format
 * @see https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/URLSearchParams
 *
 * @param {String} path
 * @param {String|Object} params Any value that can safely be passed as
 *   parameter one to the URLSearchParams constructor.
 * @return {URL}
 */
export default function _getWpApiUrl (path, params) {
  path = typeof path === 'string' ? path : ''
  const domain = process.env.NEXT_PUBLIC_WP_URL
  path = '/wp-json' + path

  const searchParams = new URLSearchParams(params)

  // This needs to be set for ACF to return nested objects.
  searchParams.append('acf_format', 'standard')

  const query = searchParams.toString()
  if (query.length > 0) {
    path = path + '?' + query
  }

  return new URL(...[path, domain])
}
