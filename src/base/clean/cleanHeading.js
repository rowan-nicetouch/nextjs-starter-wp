'use strict'

import { ATTS, TEXT_TAGS } from 'base/clean/values'
import clean from 'base/clean/clean'

/**
 * Clean value intended to be rendered in an HTML heading element.
 *
 * This function should, at the very least, exclude all headings.
 */
export default function cleanHeading (aught) {
  return clean(aught, {
    ALLOWED_ATTR: ATTS,
    ALLOWED_TAGS: TEXT_TAGS
  })
}
