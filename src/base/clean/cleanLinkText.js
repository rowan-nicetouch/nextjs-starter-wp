'use strict'

import { ATTS, TEXT_TAGS } from 'base/clean/values'
import clean from 'base/clean/clean'

export default function cleanLinkText (aught) {
  return clean(aught, {
    ALLOWED_ATTR: ATTS,
    ALLOWED_TAGS: TEXT_TAGS
  })
}
