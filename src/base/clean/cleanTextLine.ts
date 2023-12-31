'use strict'

import { clean } from 'base/clean'

/**
 * Clean value intended to be rendered as inline text.
 */
export function cleanTextLine (aught:any) : string {
  return clean(aught, {
    ALLOWED_ATTR: [
      'id',
      'class',
      'style',
      'title',
    ],
    ALLOWED_TAGS: [
      'a',
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
