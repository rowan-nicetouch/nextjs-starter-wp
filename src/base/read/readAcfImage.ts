import { readUrl, readWpImage } from 'base/read'
import { WpImage } from 'base/types'

/**
 * Read data from an ACF image field.
 *
 * ACF may return images in one of three types:
 *
 *   1. Image Array
 *   2. Image URL
 *   3. Image ID
 *
 * This function supports the first and second type. The third type "Image ID"
 * would need special handling because it is requires that another fetch request
 * be sent to the WP REST API.
 *
 * Note URLS from images should NOT be rewritten.
 */
export function readAcfImage (aught:any) : WpImage {
  return typeof aught === 'string'
    ? readImageString(aught)
    : readWpImage(aught)
}

function readImageString (aught:string) : WpImage {
  return {
    alt: '',
    height: 0,
    id: 0,
    src: readUrl(aught),
    width: 0
  }
}
