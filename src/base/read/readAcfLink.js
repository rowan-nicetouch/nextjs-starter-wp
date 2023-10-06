'use strict'

import cleanLinkText from 'base/clean/cleanLinkText'
import cleanPlainText from 'base/clean/cleanPlainText'
import readWpUrl from 'base/read/readWpUrl'

/**
 * Read data from an ACF field having a type of "Link".
 *
 * Notes:
 *   - ACF does not allow HTML to be included in link text. Its strategy for
 *     dealing with it is to entity encode which is a bad choice imo
 *
 * @param {Mixed} aught A value to read as an ACF Link field.
 *
 * @return {Object} link
 * @return {String} link.src - The  value to use in the rendered link's src attribute.
 * @return {String} link.text - The value to use in the rendered link's link text.
 * @return {String} link.target - The value of the link's target attribute.
 */
export default function readAcfLink (link) {
  const { target, title, url } = link || {}
  return {
    src: readWpUrl(url),
    text: cleanLinkText(title),
    target: cleanPlainText(target),
  }
}
