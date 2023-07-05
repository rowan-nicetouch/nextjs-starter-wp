import cleanPlainText from 'base/clean/cleanPlainText'
import cleanUrl from 'base/clean/cleanUrl'
import cleanWholeNumber from 'base/clean/cleanWholeNumber'

export default function readWpImage (aught) {
  const { alt, height, id, url, width } = aught || {}
  return {
    alt: cleanPlainText(alt),
    height: cleanWholeNumber(height),
    id: cleanWholeNumber(id),
    src: cleanUrl(url),
    width: cleanWholeNumber(width)
  }
}
