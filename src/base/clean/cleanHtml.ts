'use strict'

import { clean } from 'base/clean'

/**
 * Clean HTML.
 *
 * For rendering of content that allows for the most liberal amount of HTML
 * possible. This is intended to be used for WordPress post and page content as
 * well as other WSIWYG fields.
 */
export function cleanHtml (aught:any) : string {
  return clean(aught)
}
