import _getWpApiUrl from 'base/fetch/_getWpApiUrl'

/**
 * Fetch from WordPress REST API v2
 *
 * @param {String} endpoint - (required) Must include everything to the right
 *   of `example.com/wp-json`.
 * @param {Mixed} urlParams - (optional) Any value that can safely be passed as
 *   parameter one to the URLSearchParams constructor.
 * @param {Object} fetchOptions - (optional) Passed as parameter 2 to fetch().
 *
 * @return {Promise}
 */
export async function wpFetch (endpoint, urlParams, fetchOptions) {
  fetchOptions = (() => {
    // Ensure that a revalidation strategy is always present.
    const output = {
      revalidate: 10
    }
    if (typeof fetchOptions === 'object') {
      return {...output, ...fetchOptions}
    } else {
      return output
    }
  })()

  const resource = _getWpApiUrl(endpoint, urlParams)
  const response = await fetch(resource, fetchOptions)

  return response
}
