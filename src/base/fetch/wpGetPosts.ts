import { wpFetch } from 'base/fetch'
import { ListPostsArguments } from 'base/types'
/**
 * @see https://developer.wordpress.org/rest-api/reference/posts/#arguments
 */


/**
 * Read the results of a fetch request to the /wp-json/wp/v2/pages/ endpoint.
 *
 * @param {Mixed} urlParams - (optional) Any value that can safely be passed as
 *   parameter one to the URLSearchParams constructor.
 * @param {Object} fetchOptions - (optional) Passed as parameter 2 to fetch().
 *
 * @todo Replace reader with wpReadPage() when this function exists.
 */
export async function wpGetPosts (
  urlParams:ListPostsArguments,
  fetchOptions:any
) : Promise<any> {
  try {
    const result = await wpFetch('/wp/v2/posts', urlParams, fetchOptions)
    if (!result.ok) {
      throw new Error('Unable to fetch page data from WordPress')
    }

    const pages = await result.json()
    if (!Array.isArray(pages) || pages.length < 1) {
      throw new Error('No pages found.')
    }

    return pages
  } catch (error:any) {
    throw new Error(
      typeof error?.message === 'string'
        ? 'wpGetPages() - ' + error.message
        : 'wpGetPages() - Error'
    )
  }
}
