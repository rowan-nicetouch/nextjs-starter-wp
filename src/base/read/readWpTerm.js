'use strict'

import cleanWholeNumber from 'base/clean/cleanWholeNumber'
import cleanPlainText from 'base/clean/cleanPlainText'
import readWpUrl from 'base/read/readWpUrl'

/**
 * Reads data from WordPress term object.
 *
 * @todo Read and clean ACF data.
 */
export default function readWpTerm (aught) {
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
