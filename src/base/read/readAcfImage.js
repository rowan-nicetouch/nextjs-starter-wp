'use strict'

import cleanPlainText from 'base/clean/cleanPlainText'
import cleanUrl from 'base/clean/cleanUrl'
import cleanWholeNumber from 'base/clean/cleanWholeNumber'

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
export default function readAcfImage (aught) {
  return typeof aught === 'string'
    ? readImageString(aught)
    : readImageObject(aught)
}
function readImageString (aught) {
  return {
    alt: '',
    height: 0,
    id: 0,
    src: cleanUrl(aught),
    width: 0
  }
}
function readImageObject (aught) {
  const { alt, height, id, url, width } = aught || {}
  return {
    alt: cleanPlainText(alt),
    height: cleanWholeNumber(height),
    id: cleanWholeNumber(id),
    src: cleanUrl(url),
    width: cleanWholeNumber(width)
  }
}