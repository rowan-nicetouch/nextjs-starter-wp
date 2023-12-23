import { cleanPlainText, cleanWholeNumber } from 'base/clean'
import { readUrl } from 'base/read'
import { WpImage } from 'base/types'

export function readWpImage (aught:any) : WpImage {
  const { alt, height, id, url, width } = aught || {}
  return {
    alt: cleanPlainText(alt),
    height: cleanWholeNumber(height),
    id: cleanWholeNumber(id),
    src: readUrl(url),
    width: cleanWholeNumber(width)
  }
}
