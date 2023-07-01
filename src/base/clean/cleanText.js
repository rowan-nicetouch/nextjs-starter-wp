import clean from 'base/clean/clean'

/**
 * Plain Text
 *
 * For use in contexts where plain text is expected. This function will strip
 * all HTML tags.
 */
export default function cleanText (aught) {
  return clean(aught, { ALLOWED_TAGS: [] })
}
