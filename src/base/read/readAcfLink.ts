'use strict'

import { cleanLinkText, cleanPlainText } from 'base/clean'
import { readWpUrl } from 'base/read'
import { AcfLink } from 'base/types'

/**
 * Read data from an ACF field having a type of "Link".
 *
 * Notes:
 *   - ACF does not allow HTML to be included in link text. Its strategy for
 *     dealing with it is to entity encode. You have been warned.
 */
export function readAcfLink (link:any) : AcfLink {
  const { target, title, url } = link || {}
  return {
    href: readWpUrl(url),
    text: cleanLinkText(title),
    target: cleanPlainText(target),
  }
}
