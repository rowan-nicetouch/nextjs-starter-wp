import { wpFetch } from 'base/fetch/wpFetch'
import { readWpPost } from 'base/read/readWpPost'

/**
 * Read the results of a fetch request to the /wp-json/wp/v2/pages/ endpoint.
 *
 * @param {Mixed} urlParams - (optional) Any value that can safely be passed as
 *   parameter one to the URLSearchParams constructor.
 * @param {Object} fetchOptions - (optional) Passed as parameter 2 to fetch().
 *
 * @todo Replace reader with wpReadPage() when this function exists.
 * @return {Array}
 */
export async function wpGetPages (urlParams, fetchOptions) {
  try {
    const result = await wpFetch('/wp/v2/pages', urlParams, fetchOptions)
    if (!result.ok) {
      throw new Error('Unable to fetch page data from WordPress')
    }
    const pages = await result.json()
    if (!Array.isArray(pages) || pages.length < 1) {
      throw new Error('No pages found.')
    }
    return pages.map(readWpPost)
  } catch (error) {
    throw new Error('wpGetPages: ' + error.message)
  }
}
