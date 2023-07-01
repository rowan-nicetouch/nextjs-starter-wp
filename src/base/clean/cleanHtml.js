'use strict'

import clean from 'base/clean/clean'

/**
 * Clean HTML.
 *
 * For rendering of content that allows for the most liberal amount of HTML
 * possible. This is intended to be used on WOrdPRess psots and page content as
 * well as other WSIWYG fields.
 */
export default function cleanHtml (aught) {
  return clean(aught)
}
