'use strict'
import readWpUrl from './readWpUrl'
import { cleanText } from 'base/clean'

/**
 * Reads data from WordPress term object.
 *
 * @todo Read and clean ACF data.
 */
export default function readWpTerm (aught) {
  const output = {
    id: 0,
    link: readWpUrl(aught?.link),
    name: cleanText(aught?.name),
    slug: cleanText(aught?.slug),
    taxonomy: cleanText(aught?.taxonomy),
    acf: {},
  }

  if (typeof aught?.acf === 'object') {
    output.acf = {...aught.acf}
  }

  return output
}
