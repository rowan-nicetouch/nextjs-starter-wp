'use strict'

import { clean } from 'base/clean'

/**
 * Plain Text
 *
 * For use in contexts where plain text is expected.
 * This function will strip all HTML tags.
 */
export function cleanPlainText (aught:any) : string {
  return clean(aught, { ALLOWED_TAGS: [] })
}
