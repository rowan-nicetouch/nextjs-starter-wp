'use strict'

import { cleanWholeNumber, cleanPlainText } from 'base/clean'
import { readWpUrl } from 'base/read'

import { WpTerm } from 'base/types'

/**
 * Reads data from WordPress term object.
 *
 * @todo Read and clean ACF data.
 */
export function readWpTerm (aught:any) : WpTerm {
  const output = {
    id: cleanWholeNumber(aught?.id),
    link: readWpUrl(aught?.link),
    name: cleanPlainText(aught?.name),
    slug: cleanPlainText(aught?.slug),
    taxonomy: cleanPlainText(aught?.taxonomy),
    acf: {},
  }

  if (typeof aught?.acf === 'object') {
    output.acf = {...aught.acf}
  }

  return output
}
