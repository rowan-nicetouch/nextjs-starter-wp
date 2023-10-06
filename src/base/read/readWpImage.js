import cleanPlainText from 'base/clean/cleanPlainText'
import cleanWholeNumber from 'base/clean/cleanWholeNumber'
import readUrl from 'base/read/readUrl'

export default function readWpImage (aught) {
  const { alt, height, id, url, width } = aught || {}
  return {
    alt: cleanPlainText(alt),
    height: cleanWholeNumber(height),
    id: cleanWholeNumber(id),
    src: readUrl(url),
    width: cleanWholeNumber(width)
  }
}
