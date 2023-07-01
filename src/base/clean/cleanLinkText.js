'use strict'

import clean from 'base/clean/clean'

/**
 * Clean value intended to be rendered as the content of an HTML link element.
 *
 * This function should include all noninteractive, text-based elements
 * suitable for displaying an unbroken line of HTML text.
 */
export default function cleanLinkText (aught) {
  return clean(aught, {
    ALLOWED_ATTR: [
      'id',
      'class',
      'style',
      'title',
    ],
    ALLOWED_TAGS: [
      'abbr',
      'b',
      'bdi',
      'bdo',
      'code',
      'del',
      'dfn',
      'em',
      'i',
      'ins',
      'kbd',
      'mark',
      'q',
      's',
      'samp',
      'small',
      'span',
      'strong',
      'sub',
      'sup',
      'u',
      'var',
      'wbr'
    ]
  })
}
